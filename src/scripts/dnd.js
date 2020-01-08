export default class {
    /**
     * Drag and drop для элементов списков.
     */
    constructor() {
        this.dragSrcEl;
    }

    /**
     * Добавление собыия клика на кнопку добавления/удаления элементов из списка.
     */
    init() {
        this.targetZone = document.querySelector('.js-target-zone');
        this.sourceZone = document.querySelector('.js-source-zone');
        this.items = this.sourceZone.querySelectorAll('.js-item');
        this.toggleBtn = document.querySelectorAll('.js-toggle-btn');

        this._addDnDHandlers(this.sourceZone, this.targetZone);

        for (const btn of this.toggleBtn) {
            btn.addEventListener('click', () => {
                const dropElem = btn.closest('li');

                if (btn.closest('.js-target-zone')) {
                    this._removeItemFromList(dropElem);
                } else {
                    this._addItemToList(dropElem);
                }
            });
        }
    }

    /**
     * Добавление события drag and drop для всех элементов списка друзей.
     * @param sourceZone {HTMLElement} - полный список друзей.
     * @param targetZone {HTMLElement} - новый список.
     * @private
     */
    _addDnDHandlers(sourceZone, targetZone) {
        targetZone.addEventListener('dragstart', (e) => {
            e.target.classList.contains('item') ?
                this.dragSrcEl = e.target :this.dragSrcEl = e.target.closest('li');
        });

        sourceZone.addEventListener('dragstart', (e) => {
            e.target.classList.contains('item') ?
                this.dragSrcEl = e.target :this.dragSrcEl = e.target.closest('li');
        });

        sourceZone.addEventListener('dragover', (e) => e.preventDefault());

        targetZone.addEventListener('dragover', (e) => e.preventDefault());

        sourceZone.addEventListener('drop', () => this._removeItemFromList(this.dragSrcEl));

        targetZone.addEventListener('drop', () => this._addItemToList(this.dragSrcEl));
    }

    /**
     * Добавление перемещаемого элемента из общего списка в новый.
     * @param dropElem {HTMLElement} - элемент списка.
     * @private
     */
    _addItemToList(dropElem) {
        this.targetZone.prepend(dropElem);
    }

    /**
     * Удаление перемещаемого элемента из нового списка в общий.
     * @param dropElem {HTMLElement} - элемент списка.
     * @private
     */
    _removeItemFromList(dropElem) {
        this.sourceZone.prepend(dropElem);
    }
};
