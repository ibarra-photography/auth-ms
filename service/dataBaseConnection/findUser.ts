import { findUserMaper } from '../../application/mapers/findUserMapper';
import { User } from '../../domain/user';
import { LoginViewModel } from '../viewModels/loginViewModel';
import { usersCollection, mongoClient, getPointer } from './mongoClient';

export async function findUser(username: string) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);

    const user: User = await userPointer.findOne({ username: username.username }, function (error, user: User) {
      if (error) {
        console.log(error);
        throw new Error(`Invalid username or password`);
      } else {
        return user;
      }
    });

    const userViewModel: LoginViewModel = findUserMaper(user);
    return userViewModel;
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
