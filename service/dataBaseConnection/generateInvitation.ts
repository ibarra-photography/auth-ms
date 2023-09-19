import { Document, WithId } from 'mongodb';
import { findUserMaper } from '../../application/mapers/findUserMapper';
import { User } from '../../domain/user';
import { LoginViewModel } from '../viewModels/loginViewModel';
import { usersCollection, mongoClient, getPointer } from './mongoClient';

export async function generateInvitation(inviterUsername) {
  await mongoClient.connect();
  const userPointer = getPointer(usersCollection);
}
