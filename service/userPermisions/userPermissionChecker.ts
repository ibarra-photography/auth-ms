import {getUserPermissions} from '../../service/dataBaseConnection/getUserPermission'

export type Permissions = 'invite' | 'post' | 'admin';

export async function  userPermissionChecker(username: string, permissions: Permissions[]) {
    
    const permissionsFromDB = await getUserPermissions(username);
    console.log("Permissions: ", permissionsFromDB)
    if(!permissionsFromDB) return false

    let hasPermission = true;
    permissions.forEach(permission => {
        console.log(permission)
        if (permissionsFromDB[permission] === false) hasPermission = false;
    });
    return hasPermission;
}
