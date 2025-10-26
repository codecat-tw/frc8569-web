import { MongoClient } from "mongodb";

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(
      process.env.MONGODB_URI as string,
    );
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(process.env.MONGODB_URI as string);
}

const mongoClient = await client.connect();
const db = mongoClient.db();

export { db };
