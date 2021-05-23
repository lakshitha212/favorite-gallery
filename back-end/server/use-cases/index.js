import makeCreateTest from './create-test'
import makeGetEntries from './get-entries'
import makeUpdateEntry from './update-entry'

import backendDb from '../data-access'

import { callRemoteAPI } from '../misc/interface'

const createTest = makeCreateTest({ backendDb })
const getEntries = makeGetEntries({ backendDb, callRemoteAPI })
const updateEntry = makeUpdateEntry({ backendDb })

const backendService = Object.freeze({
    createTest,
    getEntries,
    updateEntry
})

export default backendService

export {
    createTest,
    getEntries,
    updateEntry
}