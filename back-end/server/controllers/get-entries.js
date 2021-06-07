export default function makeGetEntries({ client, CACHED_LABEL }) {
    return async function sendResponse(httpRequest) {
        try {

            const { source = {} } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const cachedData = await client.get(CACHED_LABEL)
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