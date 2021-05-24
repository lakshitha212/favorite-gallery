
import {
  createTest,
  getEntries,
  updateEntry,
  sortEntries
} from '../use-cases'

import notFound from './not-found'

import makePostCreateTest from './create-test'
import makePostEntries from './get-entries'
import makePostEntry from './update-entry'
import makeSortEntries from './sort-entries'

const postTest = makePostCreateTest({ createTest })
const postEntries = makePostEntries({ getEntries })
const postEntry = makePostEntry({ updateEntry })
const rearrangeEntries = makeSortEntries({ sortEntries })


const backendController = Object.freeze({
  postTest,
  postEntries,
  postEntry,
  rearrangeEntries,
  notFound
})

export default backendController
export {
  postTest,
  postEntries,
  postEntry,
  rearrangeEntries,
  notFound
}
