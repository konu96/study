const xmlhttprequest = require('xmlhttprequest');

const fetchUrl = url => {
    return new Promise(((resolve, reject) => {
        const request = new xmlhttprequest.XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = () => {
            if (200 <= request.status && request.status < 300) {
                resolve(request.responseText)
            } else {
                reject(new Error(request.statusText))
            }
        }

        request.onerror = () => {
            reject(new Error((request.statusText)))
        }

        request.send();
    }))
}

const url = 'https://httpbin.org/get';
fetchUrl(url).then(response => {
    console.log(response);
}).catch(error => {
    console.error(error);
})