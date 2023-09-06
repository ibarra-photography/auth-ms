import { Document, ObjectId, WithId } from 'mongodb';
import { findUserMaper } from '../../application/mapers/findUserMapper';
import { User } from '../../domain/user';
import { LoginViewModel } from '../viewModels/loginViewModel';
import { usersCollection, mongoClient, getPointer } from './mongoClient';

interface UserDocument extends Document, User { 

}

export async function findUser(username: string) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);

    let user: User;
    const userDocument: WithId<UserDocument> | null = await userPointer.findOne({ username: username });
    if (!userDocument) throw new Error('Invalid username or passwod');
    else if (userDocument){

    user = { ...userDocument };
    const userViewModel: LoginViewModel = findUserMaper(user);
    return userViewModel;
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
