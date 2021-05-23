export default function makeUpdateEntry({ backendDb }) {
    return async function updateEntry(userToken, card) {
        // const { REMOTE_ENTRY_URL } = process.env
        // const remote_entries = await callRemoteAPI({ url: REMOTE_ENTRY_URL, method: "GET", json: true })

        // const updated_entries = await remote_entries.entries.map(entry => ({ ...entry, _isFavourite: false }))

        // if (userToken) {
        //     return await userDb.findById({ id: userToken })
        // }
        console.log(card)
        return await backendDb.update({
            id: userToken,
            card: card
        })
    }
}