import { MongoClient } from "mongodb";

class Mongo {
  client: MongoClient;

  constructor(uri: string) {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    return this.client.connect();
  }
}

const mongo = new Mongo("mongodb://mongodb:27017/masteos");

export default mongo;
