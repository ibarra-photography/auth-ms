import { invitationsCollection, mongoClient, getPointer } from './mongoClient';

import { Invitations } from '../../domain/invitations';

export async function markInvitationAsUsed(invitationNumber: string) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(invitationsCollection);

    const invitationDocument = await userPointer.findOne({ invitationCode: invitationNumber });
    if (!invitationDocument) throw new Error('Invalid username or passwod');
    else if (invitationDocument) {
      await userPointer.updateOne({ _id: invitationDocument._id }, { $set: { isValid: false } as Partial<Invitations> });
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
