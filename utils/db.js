import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`mongodb://${this.host}:${this.port}/${this.database}`, { useUnifiedTopology: true });
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const userDatabase = this.client.db().collection('users');
    const count = await userDatabase.countDocuments();
    return count;
  }

  async nbFiles() {
    const filedatabase = this.client.db().collection('files');
    const count = await filedatabase.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();
export default dbClient;
