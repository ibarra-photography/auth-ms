import { registerUserMaper } from '../../application/mapers/registerUserMaper';
import { RegisterUserViewModel } from 'service/viewModels/RegisterUserViewModel';
import { usersCollection, mongoClient, getPointer } from './mongoClient';

export async function insetUser(userViewModel: RegisterUserViewModel) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);
    const user = registerUserMaper(userViewModel);

    const dbResponse = await userPointer.insertOne(user);
    if (dbResponse.acknowledged) throw new Error('Error on user  db');
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
