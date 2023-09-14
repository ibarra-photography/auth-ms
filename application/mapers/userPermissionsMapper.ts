import { User } from '../../domain/user';
import { UserPermissionsViewModel } from '../../service/viewModels/userPermissionsViewModel';

export function userPermissionsMapper(user: User) {
  const userPermissions: UserPermissionsViewModel = {
    post: user.permissions!.post,
    admin: user.permissions!.admin,
    invite: user.permissions!.invite
  };

  return userPermissions;
}
