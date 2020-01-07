const popupTemplate = require('../templates/popup.hbs');

export default class  {
    constructor() {}
    init() {
        this.body = document.body;
        const html = popupTemplate();

        this.body.insertAdjacentHTML('beforeend', html);
        this.body.style.overflow = 'hidden';

        this._bindEvents();

    }

    _bindEvents() {
        this.popup = document.querySelector('.js-popup');
        const wrapper = this.popup.querySelector('.js-popup-wrapper');
        const btn = this.popup.querySelector('.js-close-popup');

        btn.addEventListener('click', () => this._closePopup());

        this.popup.addEventListener('click', (event) => {
            const isClickInside = wrapper.contains(event.target);

            if (!isClickInside) {
                this._closePopup();
            }
        });
    }

    _closePopup() {
        this.popup.style.display = 'none';
        this.body.style.overflow = 'auto';
    }
}
