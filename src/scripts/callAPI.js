import { config } from './config';

/**
 * @description Call VK API.
 * @param method {string} - method for working with data.
 * @param params {object} - set of input parameters.
 * @returns {Promise}
 */
export default function callAPI(method, params) {
    params.v = config.version;

    return new Promise((resolve, reject) => {
        VK.api(method, params, data => {
            data.error
                ? reject(data.error)
                : resolve(data.response);
        });
    });
}
