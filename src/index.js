function makeRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    
    return xhr;
}

function getFakeData() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const xhr = makeRequest('./data/fakeData.json');

            if (xhr.status != 200) {
                reject(new Error(xhr.status + ': ' + xhr.statusText))
            } else {
                resolve(xhr.responseText)
            }
        }, 2000)
    });
}

function checkData(data) {
    console.log(data);
    return data
}

function getUser() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const xhr = makeRequest('./data/user.json');

            if (xhr.status != 200) {
                reject(new Error(xhr.status + ': ' + xhr.statusText))
            } else {
                resolve(xhr.responseText)
            }
        }, 2000)
    });
}

getFakeData()
    .then(checkData)
    .then(getUser)
    .then(checkData)
    .catch();



