import mongodb, { MongoClient, MongoClientOptions } from 'mongodb';

const mongoClientOptions: MongoClientOptions = {};

const uri = '';

export const mongoClient: MongoClient = new mongodb.MongoClient(uri, mongoClientOptions);

export const dbName = 'auth-db';

export const usersCollection = 'users';
export const invitationsCollection = 'invitations';
export type Collections = typeof usersCollection | typeof invitationsCollection;

export function getPointer(collection: Collections) {
  const database: mongodb.Db = mongoClient.db(dbName);
  return database.collection(collection);
}
