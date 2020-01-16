/**
 * @description Save data to localStorage about added friends to the list.
 */
export default function saveData() {
    let savedFriends = JSON.parse(localStorage.savedFriends || '{}');
    const saveBtn = document.querySelector('.js-save-btn');
    const targetZone = document.querySelector('.js-target-zone');

    saveBtn.addEventListener('click', () => {
        savedFriends = [];

        for (const item of targetZone.children) {
            if (item.dataset.id) {
                const { id } = item.dataset;
                savedFriends.push(id);
            }
        }

        localStorage.savedFriends = JSON.stringify(savedFriends || '{}')
    });
}
