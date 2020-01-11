import callAPI from './callAPI';
import renderFriends from './renderFriends';

/**
 * @description Get user friend data.
 */
export default async function getData() {
    let fullListData = [];
    const newListData = [];
    const sourceZone = document.querySelector('.js-source-zone');
    const targetZone = document.querySelector('.js-target-zone');
    const name = document.querySelector('.header__name');
    let savedFriends = JSON.parse(localStorage.savedFriends || '{}');

    const [ me ] = await callAPI('users.get', {name_case: 'gen'});
    name.innerHTML = me.first_name + ' ' + me.last_name;

    const friends = await callAPI('friends.get', {fields: 'photo_50'});

    if (savedFriends.length) {
        friends.items.forEach(item => {
            savedFriends.includes(String(item.id))
                ? newListData.push(item)
                : fullListData.push(item);
        });

        renderFriends(targetZone, newListData);
    } else {
        fullListData = friends.items;
    }

    renderFriends(sourceZone, fullListData);
}
