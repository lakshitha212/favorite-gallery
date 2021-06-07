import makeUpdateEntry from './update-entry'
import makeSortEntries from './sort-entries'
import makeGetUser from './get-user'
import makeCreateUser from './create-user'

import backendDb from '../data-access'

const updateEntry = makeUpdateEntry({ backendDb })
const sortEntries = makeSortEntries({ backendDb })
const getUser = makeGetUser({ backendDb })
const createUser = makeCreateUser({ backendDb })

const backendService = Object.freeze({
    updateEntry,
    sortEntries,
    getUser,
    createUser
})

export default backendService

export {
    updateEntry,
    sortEntries,
    getUser,
    createUser
}