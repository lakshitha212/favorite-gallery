import makeCreateTest from './create-test'
import makeGetEntries from './get-entries'

import backendDb from '../data-access'

import { callRemoteAPI } from '../misc/interface'

const createTest = makeCreateTest({ backendDb })
const getEntries = makeGetEntries({ backendDb, callRemoteAPI })

const backendService = Object.freeze({
    createTest,
    getEntries
})

export default backendService

export {
    createTest,
    getEntries
}