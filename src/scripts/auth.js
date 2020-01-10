import dragAndDrop from './dragAndDrop'
import filter from "./filter";
import popup from "./popup";
import itemTemplate from '../templates/item.hbs';

/**
 * VK authorization.
 * @param apiId {number} – VK application id.
 * @param vkVersion {string} – VK API version.
 */
export default function auth(apiId, vkVersion) {
    const id = apiId;
    const version = vkVersion;
    const accessRight = 2;
    let fullListData = [];
    const newListData = [];
    let savedFriends = JSON.parse(localStorage.savedFriends || '{}');
    const saveBtn = document.querySelector('.js-save-btn');
    const sourceZone = document.querySelector('.js-source-zone');
    const targetZone = document.querySelector('.js-target-zone');
    const name = document.querySelector('.header__name');

    VK.init({
        apiId: id
    });

    const auth = new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            data.session
                ? resolve()
                : reject(new Error('Не удалось авторизоваться! Отключите в вашем браузере блокировку всплывающего окна.'));
        }, accessRight);
    });

    auth.then(() => getData())
        .then(() => dragAndDrop())
        .then(() => {
            filter('.js-list-search', '.js-target-zone');
            filter('.js-friends-search', '.js-source-zone');
            saveData();
        })
        .catch((e) => {
            popup();
            console.error(e);
        });

    /**
     * Call VK API.
     * @param method {string} - method for working with data.
     * @param params {object} - set of input parameters.
     * @returns {Promise}
     */
    function callAPI(method, params) {
        params.v = version;

        return new Promise((resolve, reject) => {
            VK.api(method, params, data => {
                data.error ? reject(data.error) : resolve(data.response);
            });
        });
    }

    /**
     * Get user friend data.
     */
    async function getData() {
        const [me] = await callAPI('users.get', {name_case: 'gen'});
        name.innerHTML = me.first_name + ' ' + me.last_name;

        const friends = await callAPI('friends.get', {fields: 'photo_50'});

        if (savedFriends.length) {
            friends.items.forEach(item => {
                if (savedFriends.includes(String(item.id))) {
                    newListData.push(item);
                } else {
                    fullListData.push(item);
                }
            });

            renderFriends(targetZone, newListData);
        } else {
            fullListData = friends.items;
        }

        renderFriends(sourceZone, fullListData);
    }

    /**
     * Paste items into one of two friend list.
     * @param list {HTMLElement} – list to insert items.
     * @param dataList {object} – friend data.
     */
    function renderFriends(list, dataList) {
        dataList.forEach(item => {
            const html = itemTemplate(item);

            list.insertAdjacentHTML('beforeend', html);
        });
    }

    /**
     * Save data to localStorage about added friends to the list.
     */
    function saveData() {
        saveBtn.addEventListener('click', () => {
            savedFriends = [];

            for (const item of targetZone.children) {
                if (item.dataset.id) {
                    const id = item.dataset.id;

                    savedFriends.push(id);
                }
            }
            localStorage.savedFriends = JSON.stringify(savedFriends || '{}')
        });
    }
}

