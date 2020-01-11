import './main.scss';
import auth from './scripts/auth';
import getData from './scripts/getData';
import dragAndDrop from './scripts/dragAndDrop';
import filter from './scripts/filter';
import saveData from './scripts/saveData';
import popup from './scripts/popup';

const appId = 7134817;

auth(appId)
    .then(() => getData())
    .then(() => dragAndDrop())
    .then(() => {
        filter('.js-list-search', '.js-target-zone');
        filter('.js-friends-search', '.js-source-zone');
        saveData();
    })
    .catch((e) => {
        popup();
        console.error(e);
    });
