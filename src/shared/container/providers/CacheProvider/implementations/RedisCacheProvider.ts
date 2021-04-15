import Redis, { Redis as RedisClint } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private clint: RedisClint;

  constructor() {
    this.clint = new Redis(cacheConfig.config.redis);
  }

  async save(key: string, value: any): Promise<void> {
    await this.clint.set(key, JSON.stringify(value));
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.clint.get(key);

    if (!data) return null;

    return JSON.parse(data) as T;
  }

  async invalidate(key: string): Promise<void> {
    await this.clint.del(key);
  }

  async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.clint.keys(`${prefix}:*`);

    const pipeline = this.clint.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export default RedisCacheProvider;
