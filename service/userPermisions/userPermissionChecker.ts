import { getUserPermissions } from '../../service/dataBaseConnection/getUserPermission';

export type Permissions = 'invite' | 'post' | 'admin';

export async function userPermissionChecker(username: string, permissions: Permissions[]) {
  const permissionsFromDB = await getUserPermissions(username);
  if (!permissionsFromDB) return false;

  let hasPermission = true;
  permissions.forEach(permission => {
    if (!permissionsFromDB[permission]) hasPermission = false;
  });

  return hasPermission;
}
