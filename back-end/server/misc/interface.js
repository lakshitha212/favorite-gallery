const request = require('request');
const fs = require('fs')
const sharp = require('sharp')
sharp.cache(true);
import { IMAGE_LIST, CACHED_LABEL } from './constant'
import { client } from './redisClient'

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
    const remote_entries = IMAGE_LIST
    return Promise.all(remote_entries.entries.map(entry => {

        return new Promise(function (resolve, reject) {
            const resize = sharp().resize(200, 200);
            var writeStream = fs.createWriteStream(`./public/uploads/${entry.id}.jpg`);
            request({ uri: entry.picture }).pipe(resize).pipe(writeStream);
            resize.on('finish', function () {
                resolve({ id: entry.id, picture: `/static/uploads/${entry.id}.jpg`, _isFavourite: false })
            });
        })

    }))
}

export async function cached() {
    const cachedData = await client.get(CACHED_LABEL)
    if (cachedData === null) {
        const entries = await resizeNsave()
        client.set(CACHED_LABEL, JSON.stringify(entries))
    }
}
