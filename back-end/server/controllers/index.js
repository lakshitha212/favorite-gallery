
import {
  createTest,
  getEntries
} from '../use-cases'

import notFound from './not-found'

import makePostCreateTest from './create-test'
import makePostEntries from './get-entries'

const postTest = makePostCreateTest({ createTest })
const postEntries = makePostEntries({ getEntries })


const backendController = Object.freeze({
  postTest,
  postEntries,
  notFound
})

export default backendController
export {
  postTest,
  postEntries,
  notFound
}
