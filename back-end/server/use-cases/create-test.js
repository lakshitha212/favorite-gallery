export default function makeCreateTest({ backendDb }) {
    return async function createTest({ }) {

        return await backendDb.insert({
            testName: "check connection"
        })
    }
}