export default function makeGetEntries({ backendDb, callRemoteAPI }) {
    return async function getEntries(userToken) {
        if (!userToken) {
            throw new Error('User token is required')
        }
        return await backendDb.findById({ id: userToken })
    }
}