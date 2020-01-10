import popupTemplate from '../templates/popup.hbs';

/**
 * Создание попапа с оповещением об ошибке авторизации.
 */
export default function popup() {
    const body = document.body;
    const html = popupTemplate();
    let popup = null;

    body.insertAdjacentHTML('beforeend', html);
    body.style.overflow = 'hidden';

    bindEvents();

    function bindEvents() {
        popup = document.querySelector('.js-popup');
        const wrapper = popup.querySelector('.js-popup-wrapper');
        const btn = popup.querySelector('.js-close-popup');

        btn.addEventListener('click', () => closePopup());

        popup.addEventListener('click', (event) => {
            const isClickInside = wrapper.contains(event.target);

            if (!isClickInside) closePopup();
        });
    }

    function closePopup() {
        popup.style.display = 'none';
        body.style.overflow = 'auto';
    }
}
