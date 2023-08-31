import { MongoClient, MongoClientOptions, Db } from 'mongodb';

const mongoClientOptions: MongoClientOptions = {};

const uri = 'mongodb://aitor:aitor1234@localhost:27017';

export const mongoClient: MongoClient = new MongoClient(uri, mongoClientOptions);

export const dbName = 'auth-db';

export const usersCollection = 'users';
export const invitationsCollection = 'invitations';
export type Collections = typeof usersCollection | typeof invitationsCollection;

export function getPointer(collection: Collections) {
  const database: Db = mongoClient.db(dbName);
  return database.collection(collection);
}
