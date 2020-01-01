export default class {
    /**
     * Инициализация параметров
     * @param filterInput {string} - селектор поля фильтрации
     * @param list {string} - селектор списка
     */
    constructor(filterInput, list) {
        this.filterInput = document.querySelector(filterInput);
        this.friendsList = document.querySelector(list);
        this.items = this.friendsList.children;
    }

    /**
     * Главный метод. Навешивает событие на поле фильтрации
     */
    init() {
        this.filterInput.addEventListener('input', () => {
            for (const item of this.items) {
                this._getData(item);
            }
        });
    }

    /**
     * Скорывает и показывает фильтрованные элементы списка
     * @param item {HTMLElement} - элемент списка
     */
    _getData(item) {
        const name = item.querySelector('.item__name').textContent;

        if (this._isMatching(name, this.filterInput.value)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }

    /**
     * Проверка на совпадение значения с именем
     * @param full {string} - полное имя
     * @param chunk {string} - введенное в поле поиска значение
     * @return {boolean} - если значение хотя бы частично совпадает с именем, то true, если нет, false
     */
    _isMatching(full, chunk) {
        const regexp = new RegExp(chunk, 'i');

        return full.search(regexp) !== -1;

    }
};
