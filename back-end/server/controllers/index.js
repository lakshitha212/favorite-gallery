
import {
  createTest,
  getEntries,
  updateEntry
} from '../use-cases'

import notFound from './not-found'

import makePostCreateTest from './create-test'
import makePostEntries from './get-entries'
import makePostEntry from './update-entry'

const postTest = makePostCreateTest({ createTest })
const postEntries = makePostEntries({ getEntries })
const postEntry = makePostEntry({ updateEntry })


const backendController = Object.freeze({
  postTest,
  postEntries,
  postEntry,
  notFound
})

export default backendController
export {
  postTest,
  postEntries,
  postEntry,
  notFound
}
