const request = require('request');
const fs = require('fs')
const sharp = require('sharp')
sharp.cache(true);

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

export async function resizeNsave() {
    const { REMOTE_ENTRY_URL } = process.env
    const remote_entries = await callRemoteAPI({ url: REMOTE_ENTRY_URL, method: "GET", json: true });
    return Promise.all(remote_entries.entries.map(entry => {

        return new Promise(function (resolve, reject) {
            const resize = sharp().resize(200, 200);
            var writeStream = fs.createWriteStream(`./public/uploads/${entry.id}.jpg`);
            request({ uri: entry.picture, gzip: true }).pipe(resize).pipe(writeStream);
            resize.on('finish', function () {
                resolve({ id: entry.id, picture: `/static/uploads/${entry.id}.jpg`, _isFavourite: false })
            });
        })

    }))
}
