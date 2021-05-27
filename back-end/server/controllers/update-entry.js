export default function makePostEntry({ updateEntry }) {
    return async function sendResponse(httpRequest) {
        try {
            const { source = {}, card } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const userToken = httpRequest.query.userToken
            if (!userToken) {
                throw new Error('User token is required')
            }
            if (!userToken) {
                throw new Error('Card data is required')
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