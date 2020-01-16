import './main.scss';
import { config } from './scripts/config';
import auth from './scripts/auth';
import getData from './scripts/getData';
import dragAndDrop from './scripts/dragAndDrop';
import filter from './scripts/filter';
import saveData from './scripts/saveData';
import popup from './scripts/popup';

auth(config.apiId)
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
