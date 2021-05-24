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
const url = process.env.USER_DB_URL || "mongodb+srv://dbuser:Mfe%40%2623LGC2@itspts-cluster-23t46.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(url, { useUnifiedTopology: true,useNewUrlParser: true })
// const client = new MongoClient(`mongodb://${mongoHost}:${mongoPort}/${mongoDb}`, { useUnifiedTopology: true, useNewUrlParser: true })
export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(mongoDb)
}

const backendDb = makeBackendDB({ makeDb })
export default backendDb
