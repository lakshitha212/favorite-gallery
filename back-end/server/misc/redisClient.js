
//Create Redis client on Redis port
const redis = require("redis");
const { promisify } = require("util");

const redisPort = process.env.REDIS_PORT || 6379
const redisHost = process.env.REDIS_HOST || "redis"
const client = redis.createClient({ host: redisHost, port: redisPort })
client.get = promisify(client.get)
export {
    client
}