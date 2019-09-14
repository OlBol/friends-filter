VK.init({
    apiId: 7134817
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login((data) => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Что-то пошло не так!'));
            }
        }, 2)
    })
}

auth().then(() => console.log('ok'));
