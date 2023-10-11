import { invitationsCollection, mongoClient, getPointer } from './mongoClient';

export async function getInvitationsDb() {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(invitationsCollection);

    const invitations =  userPointer.find({}).toArray();
    if (!invitations) throw new Error('No invitations found!');
    else if (invitations) {
      return invitations;
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
