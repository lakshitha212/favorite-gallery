
import {
  createTest
} from '../use-cases'

import notFound from './not-found'

import makePostCreateTest from './create-test'

const postTest = makePostCreateTest({ createTest })


const backendController = Object.freeze({
  postTest,
  notFound
})

export default backendController
export {
  postTest,
  notFound
}
