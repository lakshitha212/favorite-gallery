export default function makeSortEntries({ sortEntries }) {
    return async function sendResponse(httpRequest) {
        try {
            const { source = {}, userToken, images } = httpRequest.body
            // console.log(userToken)
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            if (!userToken) {
                throw new Error('User token is required')
            }
            if (!images) {
                throw new Error('Images are required')
            }
            const entries = await sortEntries(userToken, images)

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