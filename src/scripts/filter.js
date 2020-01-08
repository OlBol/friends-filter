export default class {
    /**
     * Фильтрация элементов списка по имени.
     * @param filterInput {string} - селектор поля фильтрации.
     * @param list {string} - селектор списка.
     */
    constructor(filterInput, list) {
        this.filterInput = document.querySelector(filterInput);
        this.friendsList = document.querySelector(list);
        this.items = this.friendsList.children;
    }

    /**
     * Добавление события для поля фильтрации.
     */
    init() {
        this.filterInput.addEventListener('input', () => {
            for (const item of this.items) {
                this._getData(item);
            }
        });
    }

    /**
     * Скорывает и показывает отфильтрованные элементы списка.
     * @param item {HTMLElement} - элемент списка.
     * @private
     */
    _getData(item) {
        const name = item.querySelector('.item__name').textContent;

        this._isMatching(name, this.filterInput.value) ?
            item.style.display = 'block' : item.style.display = 'none';
    }

    /**
     * Проверка на совпадение значения поля с именем.
     * @param full {string} - полное имя.
     * @param chunk {string} - введенное в поле поиска значение.
     * @return {boolean} - если значение хотя бы частично совпадает с именем, то true, если нет, false.
     * @private
     */
    _isMatching(full, chunk) {
        const regexp = new RegExp(chunk, 'i');

        return full.search(regexp) !== -1;

    }
};
