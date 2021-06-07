export default function makeCreateUser({ backendDb }) {
    return async function createUser() {
        return await backendDb.insert({})
    }
}