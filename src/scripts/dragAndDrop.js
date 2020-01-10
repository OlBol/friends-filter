/**
 * Drag and drop для элементов списков.
 */
export default function dragAndDrop() {
    let dragSrcEl = null;
    const targetZone = document.querySelector('.js-target-zone');
    const sourceZone = document.querySelector('.js-source-zone');
    const toggleBtn = document.querySelectorAll('.js-toggle-btn');

    addDnDHandlers(sourceZone, targetZone);

    for (const btn of toggleBtn) {
        btn.addEventListener('click', () => {
            const dropElem = btn.closest('li');

            if (btn.closest('.js-target-zone')) {
                removeItemFromList(dropElem);
            } else {
                addItemToList(dropElem);
            }
        });
    }

    function addDnDHandlers(sourceZone, targetZone) {
        targetZone.addEventListener('dragstart', (e) => {
            e.target.classList.contains('item')
                ? dragSrcEl = e.target
                : dragSrcEl = e.target.closest('li');
        });

        sourceZone.addEventListener('dragstart', (e) => {
            e.target.classList.contains('item')
                ? dragSrcEl = e.target
                : dragSrcEl = e.target.closest('li');
        });

        sourceZone.addEventListener('dragover', (e) => e.preventDefault());

        targetZone.addEventListener('dragover', (e) => e.preventDefault());

        sourceZone.addEventListener('drop', () => removeItemFromList(dragSrcEl));

        targetZone.addEventListener('drop', () => addItemToList(dragSrcEl));
    }

    function addItemToList(dropElem) {
        targetZone.prepend(dropElem);
    }

    function removeItemFromList(dropElem) {
        sourceZone.prepend(dropElem);
    }
};
