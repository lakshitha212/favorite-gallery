export default function makeGetUser({ backendDb, IMAGE_LIST }) {
    return async function getUser(userToken) {
        if (userToken) {
            return await backendDb.findById({ id: userToken })
        }
        const remote_entries = IMAGE_LIST

        return await backendDb.insert({
            entries: remote_entries.entries,
            favoriteEntries: []
        })
    }
}