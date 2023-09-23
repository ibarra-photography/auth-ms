import { ValidateUserViewModel } from './validateUserViewModel';

export interface DeleteUserViewModel extends ValidateUserViewModel {
  usernameToDelete: string;
}
