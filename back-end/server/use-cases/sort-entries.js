export default function makeSortEntries({ backendDb }) {
    return async function sortEntries(userToken, images) {

        return await backendDb.sort({
            id: userToken,
            images: images
        })
    }
}