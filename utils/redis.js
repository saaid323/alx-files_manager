import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });
    this.getasync = promisify(this.client.get).bind(this.client);
    this.setasync = promisify(this.client.setex).bind(this.client);
    this.delasync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = await this.getasync(key);
    return value;
  }

  async set(key, value, duration) {
    await this.setasync(key, value, duration);
  }

  async del(key) {
    await this.delasync(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
