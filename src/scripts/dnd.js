export default class {
    constructor() {
        this.list = document.querySelector('.js-list');
        this.items = this.list.querySelectorAll('.js-item');
        this.dropZone = document.querySelector('.js-drop-zone');
        this.toggleBtn = document.querySelectorAll('.js-toggle-btn');
        this.dragSrcEl;

        this.init();
    }

    init() {
        this._addDnDHandlers(this.list, this.dropZone);

        for (const btn of this.toggleBtn) {
            btn.addEventListener('click', () => {
                const dropElem = btn.closest('li');

                if (btn.classList.contains('in-list')) {
                    btn.classList.remove('in-list');
                    this._removeItemFromList(dropElem);
                } else {
                    btn.classList.add('in-list');
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
    _addDnDHandlers(source, target) {
        source.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('item')) {
                this.dragSrcEl = e.target;
            } else {
                this.dragSrcEl = e.target.closest('li');
            }
        });

        source.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        target.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        target.addEventListener('drop', () => this._addItemToList(this.dragSrcEl));
    }

    /**
     * Добавляет перемещаемый элемент в новый список
     * @param dropElem {HTMLElement} - элемент списка
     */
    _addItemToList(dropElem) {
        dropElem.setAttribute('draggable', 'false');
        dropElem.classList.add('item--in-list');
        this.dropZone.append(dropElem);
    }

    /**
     * Удаляет перемещаемый элемент из нового списка
     * @param dropElem {HTMLElement} - элемент списка
     */
    _removeItemFromList(dropElem) {
        dropElem.setAttribute('draggable', 'true');
        dropElem.classList.remove('item--in-list');
        this.list.append(dropElem);
    }
};
