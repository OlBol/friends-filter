/**
 * Фильтрация элементов списка по имени.
 * @param input {string} - селектор поля фильтрации.
 * @param list {string} - селектор списка.
 */
export default function filter(input, list) {
    const filterInput = document.querySelector(input);
    const friendsList = document.querySelector(list);
    const items = friendsList.children;

    /**
     * Добавление события для поля фильтрации.
     */
    filterInput.addEventListener('input', () => {
        for (const item of items) {
            getData(item);
        }
    });

    /**
     * Скорывает и показывает отфильтрованные элементы списка.
     * @param item {HTMLElement} - элемент списка.
     * @private
     */
    function getData(item) {
        const name = item.querySelector('.item__name').textContent;

        isMatching(name, filterInput.value)
            ? item.style.display = 'block'
            : item.style.display = 'none';
    }

    /**
     * Проверка на совпадение значения поля с именем.
     * @param full {string} - полное имя.
     * @param chunk {string} - введенное в поле поиска значение.
     * @return {boolean} - если значение хотя бы частично совпадает с именем, то true, если нет, false.
     * @private
     */
    function isMatching(full, chunk) {
        const regexp = new RegExp(chunk, 'i');

        return full.search(regexp) !== -1;

    }
}
