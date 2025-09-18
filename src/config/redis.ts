import { propertyQueries } from "../graphql/resolvers/queries/property";
import { getRedis } from "../utils/redis";


export async function getPropertyCacheKeys() {
  const keys = await getRedisKeys()

  return keys.map((key) => {
    if (key.toLowerCase().includes("property") || key.toLowerCase().includes("properties")) {
      return key;
    }
  }).filter((key) => key !== undefined)
}

async function getRedisKeys(pattern: string = "*") {
  const redis = getRedis();

  try {
    const keys = await redis.keys(pattern);

    return keys;
  } catch (err) {
    console.error("Error in getting redis keys: ", err);
    throw new Error("Could not get Redis keys");
  }

}