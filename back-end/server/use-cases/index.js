import makeCreateTest from './create-test'
import makeGetEntries from './get-entries'
import makeUpdateEntry from './update-entry'
import makeSortEntries from './sort-entries'
import makeGetUser from './get-user'
import makeGetFavorites from './get-favorites'

import backendDb from '../data-access'

import { IMAGE_LIST } from '../misc/constant'

const createTest = makeCreateTest({ backendDb })
const getEntries = makeGetEntries({ backendDb })
const updateEntry = makeUpdateEntry({ backendDb })
const sortEntries = makeSortEntries({ backendDb })
const getUser = makeGetUser({ backendDb, IMAGE_LIST })
const getFavorites = makeGetFavorites({ backendDb })

const backendService = Object.freeze({
    createTest,
    getEntries,
    updateEntry,
    sortEntries,
    getUser,
    getFavorites
})

export default backendService

export {
    createTest,
    getEntries,
    updateEntry,
    sortEntries,
    getUser,
    getFavorites
}