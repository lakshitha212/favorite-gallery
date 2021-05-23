export default function makeGetEntries({ backendDb, callRemoteAPI }) {
    return async function getEntries(userToken) {
        const { REMOTE_ENTRY_URL } = process.env
        const remote_entries = await callRemoteAPI({ url: REMOTE_ENTRY_URL, method: "GET", json: true })

        const updated_entries = await remote_entries.entries.map(entry => ({ ...entry, _isFavourite: false }))

        if (userToken) {
            return await backendDb.findById({ id: userToken })
        }

        return await backendDb.insert({
            entries: updated_entries,
            favoriteEntries: []
        })
    }
}