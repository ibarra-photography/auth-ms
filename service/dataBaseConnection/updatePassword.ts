import { usersCollection, mongoClient, getPointer } from './mongoClient';

import { Invitations } from '../../domain/invitations';

interface  UpdatePasswordModel { 
username:string,
    password:string
}

export async function markInvitationAsUsed(updatePasswordModel: UpdatePasswordModel) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);

    const user = await userPointer.findOne({ username: updatePasswordModel.username });
    if (!invitationDocument) throw new Error('Invalid username or passwod');
    else if (invitationDocument) {
      await userPointer.updateOne({ _id: invitationDocument._id }, { $set: { isValid: false, usageDate: new Date() } as Partial<Invitations> });
      console.log(`Invitation used`);
    }
  } catch (error: Error | unknown) {
    console.warn('Error: ', Error.toString());
    throw new Error('Error on invitation upadte');
  } finally {
    setTimeout(async () => {
      await mongoClient.close();
      console.log('Db closed');
    }, 4000);
  }
}
