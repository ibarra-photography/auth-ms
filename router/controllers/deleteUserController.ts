import { Request, Response } from 'express';

import { DeleteUserViewModel } from '../../service/viewModels/deleteUserViewModel';
import { userValidationService } from '../../service/validation/userValidationService';
import { getUserPermissions } from '../../service/dataBaseConnection/getUserPermission';
import { UserPermissionsViewModel } from '../../service/viewModels/userPermissionsViewModel';
import { deleteUser } from '../../service/dataBaseConnection/deleteUser';

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const deleteUserViewModel: DeleteUserViewModel = req.body;

    const isTokenValid = userValidationService(deleteUserViewModel.username, deleteUserViewModel.token);
    if (!isTokenValid) {
      res.status(401).json({ message: 'Unauthorithed' });
      return;
    }

    const permissions: UserPermissionsViewModel | undefined = await getUserPermissions(deleteUserViewModel.username);
    if (!permissions || !permissions!.admin) {
      console.log(`${deleteUserViewModel.username} has no permission`);
      res.status(403).json({ message: 'Forbiden' });
      return;
    }

    await deleteUser(deleteUserViewModel.usernameToDelete);

    res.status(202).json({ message: 'User deleted!' });
  } catch (error: Error | unknown) {
    if (error) console.log(error);
    res.status(500).json({ message: ' Error on user deletion' });
  }
};
