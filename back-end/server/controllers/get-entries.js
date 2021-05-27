export default function makePostEntries({ getEntries, client }) {
    return async function sendResponse(httpRequest) {
        try {
            const { source = {} } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const userToken = httpRequest.query.userToken
            if (!userToken) {
                throw new Error('User token is required')
            }
            const cachedData = await client.get(userToken)
            if (cachedData != null) {
                return {
                    headers: {
                        'Content-Type': 'application/json',
                        'Last-Modified': new Date().toUTCString() // Use actual modified date of the entity
                    },
                    statusCode: 201,
                    body: {
                        entries: JSON.parse(cachedData),
                        meta_data: "from cache"
                    }
                }
            }

            const entries = await getEntries(userToken)
            client.set(userToken, JSON.stringify(entries))

            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date().toUTCString() // Use actual modified date of the entity
                },
                statusCode: 201,
                body: {
                    entries: entries,
                    meta_data: "from server"
                }
            }
        } catch (e) {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}