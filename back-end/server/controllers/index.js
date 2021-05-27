
import {
  createTest,
  getEntries,
  updateEntry,
  sortEntries,
  getUser,
  getFavorites
} from '../use-cases'

import notFound from './not-found'

//Redis client
import { client } from '../misc/redisClient'

import makePostCreateTest from './create-test'
import makePostEntries from './get-entries'
import makePostEntry from './update-entry'
import makeSortEntries from './sort-entries'
import makeGetUser from './get-user'
import makeGetFavorites from './get-favorites'

const postTest = makePostCreateTest({ createTest })
const postEntries = makePostEntries({ getEntries, client })
const postEntry = makePostEntry({ updateEntry })
const rearrangeEntries = makeSortEntries({ sortEntries })
const readUser = makeGetUser({ getUser })
const fetchFavorites = makeGetFavorites({ getFavorites })


const backendController = Object.freeze({
  postTest,
  postEntries,
  postEntry,
  rearrangeEntries,
  readUser,
  notFound,
  fetchFavorites
})

export default backendController
export {
  postTest,
  postEntries,
  postEntry,
  rearrangeEntries,
  readUser,
  notFound,
  fetchFavorites
}
