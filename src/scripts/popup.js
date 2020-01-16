import popupTemplate from '../templates/popup.hbs';

/**
 * @description Create a popup with notification of authorization error..
 */
export default function popup() {
    const body = document.body;
    const html = popupTemplate();

    body.insertAdjacentHTML('beforeend', html);
    body.style.overflow = 'hidden';

    const popup = document.querySelector('.js-popup');
    const wrapper = popup.querySelector('.js-popup-wrapper');
    const btn = popup.querySelector('.js-close-popup');

    btn.addEventListener('click', () => closePopup());

    popup.addEventListener('click', (event) => {
        const isClickInside = wrapper.contains(event.target);
        if (!isClickInside) closePopup();
    });

    /**
     * @description Close popup.
     */
    function closePopup() {
        popup.style.display = 'none';
        body.style.overflow = 'auto';
    }
}
