export default function makeGetUser({ backendDb }) {
    return async function getUser(userToken) {
        if (!userToken) {
            throw new Error('User token is required')
        }
        return await backendDb.findById({ id: userToken })
    }
}