/**
 * @description Drag and drop effects for list items.
 */
export default function dragAndDrop() {
    let dragSrcEl = null;
    const targetZone = document.querySelector('.js-target-zone');
    const sourceZone = document.querySelector('.js-source-zone');
    const toggleBtn = document.querySelectorAll('.js-toggle-btn');

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

    sourceZone.addEventListener('drop', () => sourceZone.prepend(dragSrcEl));

    targetZone.addEventListener('drop', () => targetZone.prepend(dragSrcEl));

    for (const btn of toggleBtn) {
        btn.addEventListener('click', () => {
            const dropElem = btn.closest('li');

            btn.closest('.js-target-zone')
                ? sourceZone.prepend(dropElem)
                : targetZone.prepend(dropElem);
        });
    }
};
