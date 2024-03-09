import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.connected = '';
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
    try {
      const value = await this.getasync(key);
      return value;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.setasync(key, value, duration);
    } catch (error) {
      console.error(error);
    }
  }

  async del(key) {
    try {
      await this.delasync(key);
    } catch (error) {
      console.error('Error while deleting value from Redis:', error);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
