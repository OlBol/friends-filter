import itemTemplate from '../templates/item.hbs';

/**
 * @description Paste items into one of two friend list.
 * @param list {Element} – list to insert items.
 * @param dataList {object} – friend data.
 */
export default function renderFriends(list, dataList) {
    dataList.forEach(item => {
        const html = itemTemplate(item);
        list.insertAdjacentHTML('beforeend', html);
    });
}
