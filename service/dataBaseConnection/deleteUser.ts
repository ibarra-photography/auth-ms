import { Document, WithId } from 'mongodb';
import { User } from '../../domain/user';
import { usersCollection, mongoClient, getPointer } from './mongoClient';

interface UserDocument extends Document, User {}

export async function deleteUser(username: string) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);

        console.log(username)
    const userDocument: WithId<UserDocument> | null = await userPointer.findOne({ username: username });
        console.log(userDocument)
    if (!userDocument) throw new Error('Invalid username');
    else if (userDocument) {
      await userPointer.deleteOne({ _id: userDocument._id });
    }
  } catch (error: Error | unknown) {
    if (error) {
      console.log(error);
      throw new Error('Error on db for user delete');
    }
  } finally {
    setTimeout(async () => {
      await mongoClient.close();
      console.log('Db closed');
    }, 4000);
  }
}
