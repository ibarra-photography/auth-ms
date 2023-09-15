import { Document, WithId } from 'mongodb';
import { User } from '../../domain/user';
import { usersCollection, mongoClient, getPointer } from './mongoClient';
import { userPermissionsMapper } from '../../application/mapers/userPermissionsMapper';
import { UserPermissionsViewModel } from '../viewModels/userPermissionsViewModel';

interface UserDocument extends Document, User {}

export async function getUserPermissions(username: string) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);

    let user: User;
    const userDocument: WithId<UserDocument> | null = await userPointer.findOne({ username: username });
    if (!userDocument) throw new Error('Invalid username or passwod');
    else if (userDocument) {
      user = { ...userDocument };
      const userPermissions: UserPermissionsViewModel = userPermissionsMapper(user);

      return userPermissions;
    }
  } catch (error: Error | unknown) {
    console.log(Error.toString());
    throw new Error(Error.toString());
  } finally {
    setTimeout(async () => {
      await mongoClient.close();
      console.log('Db closed');
    }, 4000);
  }
}
