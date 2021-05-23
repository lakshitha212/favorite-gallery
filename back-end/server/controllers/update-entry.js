export default function makePostEntry({ updateEntry }) {
    return async function sendResponse(httpRequest) {
        try {
            const { source = {}, userToken, card } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }

            const entries = await updateEntry(userToken, card)

            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date().toUTCString() // Use actual modified date of the entity
                },
                statusCode: 201,
                body: { entries }
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