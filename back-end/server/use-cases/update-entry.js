export default function makeUpdateEntry({ backendDb }) {
    return async function updateEntry(userToken, card) {

        return await backendDb.update({
            id: userToken,
            card: card
        })
    }
}