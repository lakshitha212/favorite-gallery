export default function makeGetUser({ backendDb, resizeNsave }) {
    return async function getUser(userToken) {
        if (userToken) {
            return await backendDb.findById({ id: userToken })
        }
        const resizedResponse = []
        const resizedObj = await resizeNsave()
        resizedResponse.push(resizedObj)
        return await backendDb.insert({
            entries: resizedResponse[0],
            favoriteEntries: []
        })
    }
}