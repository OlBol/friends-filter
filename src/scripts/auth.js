/**
 * @description VK authorization.
 * @param apiId {number} – VK application id.
 */
export default function auth(apiId) {
    const accessRight = 2;

    VK.init({
        apiId: apiId
    });

    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            data.session
                ? resolve()
                : reject(new Error('Не удалось авторизоваться! Отключите в вашем браузере блокировку всплывающего окна.'));
        }, accessRight);
    });
}

