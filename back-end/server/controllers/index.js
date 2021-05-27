
import {
  createTest,
  getEntries,
  updateEntry,
  sortEntries,
  getUser
} from '../use-cases'

import notFound from './not-found'

//Redis client
import { client } from '../misc/redisClient'

import makePostCreateTest from './create-test'
import makePostEntries from './get-entries'
import makePostEntry from './update-entry'
import makeSortEntries from './sort-entries'
import makeGetUser from './get-user'

const postTest = makePostCreateTest({ createTest })
const postEntries = makePostEntries({ getEntries, client })
const postEntry = makePostEntry({ updateEntry })
const rearrangeEntries = makeSortEntries({ sortEntries })
const readUser = makeGetUser({ getUser })


const backendController = Object.freeze({
  postTest,
  postEntries,
  postEntry,
  rearrangeEntries,
  readUser,
  notFound
})

export default backendController
export {
  postTest,
  postEntries,
  postEntry,
  rearrangeEntries,
  readUser,
  notFound
}
