const request = require('request');
export async function callRemoteAPI(options) {
    return new Promise(resolve => {
        request(options, function (error, response, body) {
            if (!error)
                resolve(body);
        })
    }).then(value => {
        return value
    })
}
