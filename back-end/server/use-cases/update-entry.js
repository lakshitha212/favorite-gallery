export default function makeUpdateEntry({ backendDb }) {
    return async function updateEntry(userToken, card) {
        if (!userToken) {
            throw new Error('User token is required')
        }
        if (!userToken) {
            throw new Error('Card data is required')
        }
        return await backendDb.update({
            id: userToken,
            card: card
        })
    }
}