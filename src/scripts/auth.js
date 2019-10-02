import DnD from './dnd.js'
import Filter from "./filter";

const template = require('../templates/item.hbs');

export default class {
    /**
     * @param apiId {number} - идентификатор VK приложения
     * @param version {string} - версия VK API
     */
    constructor(apiId, version) {
        this.apiId = apiId;
        this.version = version;

        this.init();
    }

    init(){
        (async () => {
            try {
                await this._auth();

                const [me] = await this._callARI('users.get', {name_case: 'gen'});

                const name = document.querySelector('.header__name');
                name.innerHTML = me.first_name + ' ' + me.last_name;

                const friends = await this._callARI('friends.get', {fields: 'photo_50'});

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
    }

    _auth() {
        VK.init({
            apiId: this.apiId
        });

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
     * @param method {string} - метод для работы с данными
     * @param params {object} - набор входных параметров
     */
    _callARI(method, params) {
        params.v = this.version;

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
};
