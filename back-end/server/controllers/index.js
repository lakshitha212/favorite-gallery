import {
  updateEntry,
  sortEntries,
  getUser,
  createUser
} from '../use-cases'

import notFound from './not-found'

//Redis client
import { client } from '../misc/redisClient'
import { CACHED_LABEL } from '../misc/constant'

import makeGetEntries from './get-entries'
import makePutEntry from './update-entry'
import makeSortEntries from './sort-entries'
import makeGetUser from './get-user'
import makePostCreateUser from './create-user'

const getEntries = makeGetEntries({ client, CACHED_LABEL })
const editEntry = makePutEntry({ updateEntry })
const rearrangeEntries = makeSortEntries({ sortEntries })
const readUser = makeGetUser({ getUser })
const postUser = makePostCreateUser({ createUser })


const backendController = Object.freeze({
  getEntries,
  editEntry,
  rearrangeEntries,
  readUser,
  notFound,
  postUser
})

export default backendController
export {
  getEntries,
  editEntry,
  rearrangeEntries,
  readUser,
  notFound,
  postUser
}
