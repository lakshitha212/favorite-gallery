import makeCreateTest from './create-test'

import backendDb from '../data-access'

import { callRemoteAPI } from '../misc/interface'

const createTest = makeCreateTest({ backendDb })

const backendService = Object.freeze({
    createTest
})

export default backendService

export {
    createTest
}