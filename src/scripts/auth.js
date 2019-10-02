import DnD from './dnd.js'
import Filter from "./filter";

const template = require('../templates/item.hbs');

export default function auth() {
    VK.init({
        apiId: 7134817
    });

    function auth() {
        return new Promise((resolve, reject) => {
            VK.Auth.login((data) => {
                if (data.session) {
                    resolve();
                } else {
                    reject(new Error('Не удалось авторизоваться!'));
                }
            }, 2); // 2 - право доступа к списку друзей ВК
        });
    }

    /**
     *
     *
     * */
    function callARI(method, params) {
        params.v = '5.8';

        return new Promise((resolve, reject) => {
            VK.api(method, params, (data) => {
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data.response);
                }
            });
        });
    }

// auth()
//     .then(() => {
//         return callARI('users.get', {name_case: 'gen'});
//     })
//     .then(([me]) => {
//         const name = document.querySelector('.header__name');
//
//         name.innerHTML = me.first_name + ' ' + me.last_name;
//
//         return callARI('friends.get', {fields: 'photo_50'});
//     })
//     .then(friends => {
//         const list = document.querySelector('.your-friends__list');
//
//         friends.items.forEach(item => {
//             const html = template(item);
//
//             list.insertAdjacentHTML('beforeend', html);
//         });
//     });

    (async () => {
        try {
            await auth();

            const [me] = await callARI('users.get', {name_case: 'gen'});

            const name = document.querySelector('.header__name');
            name.innerHTML = me.first_name + ' ' + me.last_name;

            const friends = await callARI('friends.get', {fields: 'photo_50'});

            const list = document.querySelector('.your-friends__list');

            friends.items.forEach(item => {
                const html = template(item);

                list.insertAdjacentHTML('beforeend', html);
            });

            const dnd = await new DnD();

            const friendsFilter = new Filter('.js-list-search', '.js-drop-zone');
            const listFilter = new Filter('.js-friends-search', '.js-list');

        } catch (e) {
            console.error(e);
        }
    })();
};
