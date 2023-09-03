import { User } from '../../domain/user';
import { LoginViewModel } from '../../service/viewModels/loginViewModel';

export function findUserMaper(user: User) {
  const loginViewModel: LoginViewModel = {
    username: user.username,
    password: user.password
  };

  return loginViewModel;
}
