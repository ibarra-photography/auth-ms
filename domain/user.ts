export interface User {
  username: string;
  password: string;
  email: string;
  isValid: boolean;
  registerDate: Date;
  lastLogin: Date;
  permissions: Permissions;
}

interface Permissions {
  invite: boolean;
  post: boolean;
  admin: boolean;
}
