export default function makeGetFavorites({ backendDb }) {
    return async function getFavorites(userToken) {
        if (!userToken) {
            throw new Error('User token is required')
        }
        return await backendDb.findById({ id: userToken })
    }
}