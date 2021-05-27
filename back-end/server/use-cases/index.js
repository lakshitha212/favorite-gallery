import makeCreateTest from './create-test'
import makeGetEntries from './get-entries'
import makeUpdateEntry from './update-entry'
import makeSortEntries from './sort-entries'
import makeGetUser from './get-user'

import backendDb from '../data-access'

import { callRemoteAPI } from '../misc/interface'

const createTest = makeCreateTest({ backendDb })
const getEntries = makeGetEntries({ backendDb, callRemoteAPI })
const updateEntry = makeUpdateEntry({ backendDb })
const sortEntries = makeSortEntries({ backendDb })
const getUser = makeGetUser({ backendDb, callRemoteAPI })

const backendService = Object.freeze({
    createTest,
    getEntries,
    updateEntry,
    sortEntries,
    getUser
})

export default backendService

export {
    createTest,
    getEntries,
    updateEntry,
    sortEntries,
    getUser
}