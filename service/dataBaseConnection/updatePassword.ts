import { usersCollection, mongoClient, getPointer } from './mongoClient';

import { User } from '../../domain/user';

export interface UpdatePasswordModel {
  username: string;
  password: string;
}

export async function updatePassword(updatePasswordModel: UpdatePasswordModel) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);

    const user = await userPointer.findOne({ username: updatePasswordModel.username });
    if (!user) throw new Error('Invalid username or passwod');
    else if (user) {
      await userPointer.updateOne({ _id: user._id }, { $set: { password: updatePasswordModel.password } as Partial<User> });
      console.log(`Invitation used`);
    }
  } catch (error: Error | unknown) {
    console.warn('Error: ', Error.toString());
    throw new Error('Erro updating password');
  } finally {
    setTimeout(async () => {
      await mongoClient.close();
      console.log('Db closed');
    }, 4000);
  }
}
