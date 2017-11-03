import 'whatwg-fetch'

export function callApi(url, o) {
    if (!url) throw new Error('Arguments for call-server are not valid: url is not exist');
    if (!o.method) throw new Error('Arguments for call-server are not valid: options are not exist');

    let options = Object.assign(
        {
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }, o)

    return fetch(url, options).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    })
}
