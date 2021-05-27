
//Create Redis client on Redis port
const redis = require("redis");
const { promisify } = require("util");

const redisPort = process.env.REDIS_PORT || 6379
const client = redis.createClient(redisPort)
client.get = promisify(client.get)
export {
    client
}