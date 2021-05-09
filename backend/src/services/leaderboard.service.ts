import { Collection } from 'mongodb';
import { Leaderboard } from '../models/leaderboard';
import mongo from './mongodb.service';

export default class LeaderboardService {
  private db: Collection<Leaderboard>;

  constructor() {
    this.db = mongo.client.db('masteos').collection('leaderboard');
  }

  async getLeaderboards(): Promise<Leaderboard[]> {
    const res = this.db.find().sort({ time: 1 });
    return res.toArray();
  }

  async createLeaderboard(doc: Leaderboard): Promise<void> {
    await this.db.insertOne(doc);
  }
}
