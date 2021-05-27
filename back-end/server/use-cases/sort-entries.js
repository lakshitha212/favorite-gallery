export default function makeSortEntries({ backendDb }) {
    return async function sortEntries(userToken, images) {
        if (!userToken) {
            throw new Error('User token is required')
        }
        if (!images) {
            throw new Error('Images are required')
        }
        return await backendDb.sort({
            id: userToken,
            images: images
        })
    }
}