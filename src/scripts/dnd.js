export default class {
    constructor() {
        this.dragSrcEl;

        this.init();
    }

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
     * Навешивает события drag and drop на все элементы списка друзей
     * @param source {HTMLElement} - полный список друзей
     * @param target {HTMLElement} - новый список
     */
    _addDnDHandlers(sourceZone, targetZone) {
        sourceZone.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('item')) {
                this.dragSrcEl = e.target;
            } else {
                this.dragSrcEl = e.target.closest('li');
            }
        });

        sourceZone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        targetZone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        targetZone.addEventListener('drop', () => this._addItemToList(this.dragSrcEl));
    }

    /**
     * Добавляет перемещаемый элемент в новый список
     * @param dropElem {HTMLElement} - элемент списка
     */
    _addItemToList(dropElem) {
        dropElem.setAttribute('draggable', 'false');
        this.targetZone.append(dropElem);
    }

    /**
     * Удаляет перемещаемый элемент из нового списка
     * @param dropElem {HTMLElement} - элемент списка
     */
    _removeItemFromList(dropElem) {
        dropElem.setAttribute('draggable', 'true');
        this.sourceZone.append(dropElem);
    }
};
