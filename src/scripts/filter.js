/**
 * @description Filter items by name.
 * @param input {string} - filter field selector.
 * @param list {string} - list selector.
 */
export default function filter(input, list) {
    const filterInput = document.querySelector(input);
    const friendsList = document.querySelector(list);
    const items = friendsList.children;

    filterInput.addEventListener('input', () => {
        for (const item of items) {
            getData(item);
        }
    });

    /**
     * @description Hide and show filtered list items.
     * @param item {HTMLElement} - list item.
     */
    function getData(item) {
        const name = item.querySelector('.item__name').textContent;

        isMatching(name, filterInput.value)
            ? item.style.display = 'block'
            : item.style.display = 'none';
    }

    /**
     * @description Check if the name of the field matches.
     * @param full {string} - full name.
     * @param chunk {string} - the value entered in the search field.
     * @returns {boolean} – if the value at least partially matches the name, then true, if not, false.
     */
    function isMatching(full, chunk) {
        const regexp = new RegExp(chunk, 'i');

        return full.search(regexp) !== -1;

    }
}
