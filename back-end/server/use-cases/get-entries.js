export default function makeGetEntries({ backendDb }) {
    return async function getEntries(userToken) {
        if (!userToken) {
            throw new Error('User token is required')
        }
        return await backendDb.findById({ id: userToken })
    }
}