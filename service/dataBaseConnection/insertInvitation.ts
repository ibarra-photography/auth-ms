import { Invitations } from '../../domain/invitations';
import { InvitationViewModel } from '../viewModels/invitationViewModel';
import {  mongoClient, getPointer, invitationsCollection } from './mongoClient';

export async function insertInvitation(invitation: InvitationViewModel ) {
  try {
    await mongoClient.connect();
    const invitationsPointer = getPointer(invitationsCollection);

    const invitationFromDb = await invitationsPointer.findOne({ invitationNumber: invitation.invitation });
    if (invitationFromDb) {
      console.log(`User ${invitation.invitation} exist!`);
      throw new Error(`User name ${invitation.invitation} exist!`);
    }

    const invitationToInsert: Invitations = { 
    invitationCode: invitation.invitation,
            isValid:true,
            generationDate:new Date(),
            generatorsUser: invitation.username,
            usageDate:undefined
            
    }
    const dbResponse = await invitationsPointer.insertOne(invitationToInsert);
    if (!dbResponse.acknowledged) throw new Error('Error on user  db');
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
