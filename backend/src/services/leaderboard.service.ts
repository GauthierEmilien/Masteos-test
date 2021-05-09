import { Collection } from "mongodb";
import { Leaderboard } from "../models/leaderboard";
import mongo from "./mongodb.service";

export class LeaderboardService {
  private db: Collection<Leaderboard>;
  constructor() {
    this.db = mongo.client.db("masteos").collection("leaderboard");
  }

  async getLeaderboards(): Promise<Leaderboard[]> {
    const res = this.db.find();
    console.log(await res.toArray());
    return res.toArray();
  }

  async createLeaderboard(doc: Leaderboard): Promise<void> {
    await this.db.insertOne(doc);
  }
}
