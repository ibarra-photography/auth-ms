import { User } from '../../domain/user';
import { RegisterUserViewModel } from '../../service/viewModels/registerUserViewModel';

export function registerUserMaper(registerUserViewModel: RegisterUserViewModel): User {
  const permissions = {
    invite: false,
    post: false,
    admin: false
  };

  const user: User = {
    username: registerUserViewModel.username,
    password: registerUserViewModel.password,
    email: registerUserViewModel.email,
    isValid: true,
    registerDate: new Date(),
    lastLogin: new Date(),
    permissions: permissions
  };
  return user;
}
