import DnD from './dnd'
import Filter from "./filter";
import Popup from "./popup";

const itemTemplate = require('../templates/item.hbs');

export default class {
    /**
     * Авторизация в VK.
     * @param apiId {number} - идентификатор VK-приложения.
     * @param version {string} - версия VK API.
     */
    constructor(apiId, version) {
        this.apiId = apiId;
        this.version = version;
        this.fullListData = [];
        this.newListData = [];
        this.savedFriends = JSON.parse(localStorage.savedFriends || '{}');
    }

    init(){
        this.saveBtn = document.querySelector('.js-save-btn');
        this.sourceZone = document.querySelector('.js-source-zone');
        this.targetZone = document.querySelector('.js-target-zone');
        this.name = document.querySelector('.header__name');

       this._auth()
           .then(() => this._getData())
           .then(() => {
               const dnd = new DnD();

               dnd.init();
           })
           .then(() => {
               const friendsFilter = new Filter('.js-list-search', '.js-target-zone');
               const listFilter = new Filter('.js-friends-search', '.js-source-zone');

               friendsFilter.init();
               listFilter.init();
               this._saveData();
            })
           .catch((e) => {
               const popup = new Popup();

               popup.init();
               console.error(e);
            });
    }

    /**
     * Авторизация в VK.
     * @return {Promise}
     * @private
     */
    _auth() {
        VK.init({
            apiId: this.apiId
        });

        return new Promise((resolve, reject) => {
            VK.Auth.login(data => {
                data.session ? resolve() : reject(new Error('Не удалось авторизоваться! Отключите в вашем браузере блокировку всплывающего окна.'));
            }, 2); // 2 - право доступа к списку друзей ВК
        });
    }

    /**
     * Обращение в VK API.
     * @param method {string} - метод для работы с данными.
     * @param params {object} - набор входных параметров.
     * @return {Promise}
     * @private
     */
    _callARI(method, params) {
        params.v = this.version;

        return new Promise((resolve, reject) => {
            VK.api(method, params, data => {
                data.error ? reject(data.error) : resolve(data.response);
            });
        });
    }

    /**
     * Получение данных о друзьях пользователя.
     * @private
     */
    async _getData() {
        const [me] = await this._callARI('users.get', {name_case: 'gen'});
        this.name.innerHTML = me.first_name + ' ' + me.last_name;

        const friends = await this._callARI('friends.get', {fields: 'photo_50'});

        if (this.savedFriends.length) {
            friends.items.forEach(item => {
                if (this.savedFriends.includes(String(item.id))) {
                    this.newListData.push(item);
                } else {
                    this.fullListData.push(item);
                }
            });

            this._renderFriends(this.targetZone, this.newListData);
        } else {
            this.fullListData = friends.items;
        }

        this._renderFriends(this.sourceZone, this.fullListData);
    }

    /**
     * Вставляет элементы с нужный список друзей.
     * @param list {HTMLElement} – список, в который будет происходить подстановка.
     * @param dataList {object} – данные о друзях.
     * @private
     */
    _renderFriends(list, dataList) {
        console.log(list, dataList);
        dataList.forEach(item => {
            const html = itemTemplate(item);

            list.insertAdjacentHTML('beforeend', html);
        });
    }

    /**
     * Сохранение данных в localStorage о добавленных друзьях в список.
     * @private
     */
    _saveData() {
        this.saveBtn.addEventListener('click', () => {
            this.savedFriends = [];

            for (const item of this.targetZone.children) {
                if (item.dataset.id) {
                    const id = item.dataset.id;

                    this.savedFriends.push(id);
                }
            }
            localStorage.savedFriends = JSON.stringify(this.savedFriends || '{}')
        });
    }
};
