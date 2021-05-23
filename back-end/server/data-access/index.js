import makeBackendDB from './backend-db'
import mongodb from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const MongoClient = mongodb.MongoClient

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_DB, MONGO_HOST } = process.env

const mongoUserName = MONGO_USERNAME || "mongouser"
const mongoPassword = MONGO_PASSWORD || "mongopassword"
const mongoPort = MONGO_PORT || 27017
const mongoDb = MONGO_DB || "favorite"
const mongoHost = MONGO_HOST || "mongo"


const client = new MongoClient(`mongodb://${mongoHost}:${mongoPort}/${mongoDb}`, { useUnifiedTopology: true, useNewUrlParser: true })
export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(mongoDb)
}

const backendDb = makeBackendDB({ makeDb })
export default backendDb
