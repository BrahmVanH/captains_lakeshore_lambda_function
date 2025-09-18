import { Redis } from '@upstash/redis';
import { getPropertyCacheKeys } from '../config/redis';

export function getRedis() {

  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
} 

export async function invalidatePropertyCaches() {
  const cacheKeys = await getPropertyCacheKeys();

  cacheKeys.forEach((key) => invalidateCache(key))
}

export async function invalidateCache(key: string) {
  const redis = getRedis()
  
  if (!key) {
    throw new Error("Cache key expected");
  }

  try {

    await redis.del(key);
  } catch (err) {
    console.error("Error in invalidating cache: ", err);
    throw new Error("Could not invalidate cache");
  }
}


