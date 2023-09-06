import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  username?: string;
  password?: string;
  email?: string;
  isValid?: boolean;
  registerDate?: Date;
  lastLogin?: Date;
  permissions?: Permissions;
}

interface Permissions {
  invite: boolean;
  post: boolean;
  admin: boolean;
}
