import { invitationsCollection, mongoClient, getPointer } from './mongoClient';

export async function findInvitation(invitationNumber: string) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(invitationsCollection);

    const invitationDocument = await userPointer.findOne({ invitationCode: invitationNumber });
    if (!invitationDocument) throw new Error('Invalid username or passwod');
    else if (invitationDocument) {
      return invitationDocument;
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
