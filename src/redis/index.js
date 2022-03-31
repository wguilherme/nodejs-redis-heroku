import 'dotenv/config';
import Redis from "ioredis";
import { promisify } from "util";


const redisConfig = {
  tls: {
    rejectUnauthorized: false
  }
}
const redisClient = new Redis(
  process.env.REDIS_URL, redisConfig
)


function getRedis(value) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value);

  // redisClient.get("")
}

function setRedis(key, value) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);

  // redisClient.set("", "")
}

// export
// module.exports = { oi: 'oi' }

export { setRedis, getRedis, redisClient };

