import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
    const redisalive = redisClient.isAlive();
    const dbalive = dbClient.isAlive();
    res.status(200).json({ redis: redisalive, db: dbalive });
  }

  static async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    res.status(200).json({ users: usersCount, files: filesCount });
  }
}
module.exports = AppController;
