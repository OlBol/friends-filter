export default class {
    constructor() {
        this.list = document.querySelector('.js-list');
        this.items = this.list.querySelectorAll('.js-item');
        this.dropZone = document.querySelector('.js-drop-zone');
        this.dragSrcEl;
        this.parentZone;

        this.init();
    }

    init() {
        // for (let zone of [this.list, this.dropZone]) {
        //     this.addDnDHandlers(zone);
        // }
        this.addDnDHandlers(this.list, this.dropZone);
    }

    addDnDHandlers(source, target) {source.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('item')) {
            this.dragSrcEl = e.target;
        } else {
            this.dragSrcEl = e.target.closest('li');
        }
        e.dataTransfer.setData('text/html', this.dragSrcEl.outerHTML);
        });

        source.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        target.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        target.addEventListener('drop', (e) => {
            if(e) {
                // const dropHTML = e.dataTransfer.getData('text/html');
                const dropElem = this.dragSrcEl;
                // target.insertAdjacentHTML('beforeend', dropHTML);
                dropElem.setAttribute('draggable', 'false');
                dropElem.classList.add('item--in-list');
                target.append(dropElem);

                // this.dragSrcEl.remove();
                // addDnDHandlers(this.previousSibling)
            }
        });
    }
};
