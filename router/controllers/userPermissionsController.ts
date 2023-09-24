import { Request, Response } from 'express';

import { ValidateUserViewModel } from '../../service/viewModels/validateUserViewModel';
import { getUserPermissions } from '../../service/dataBaseConnection/getUserPermission';
import { userValidationService } from '../../service/validation/userValidationService';
import { UserPermissionsViewModel } from '../../service/viewModels/userPermissionsViewModel';

export async function userPermissionsController(req: Request, res: Response) {
  try {
    const userViewModel: ValidateUserViewModel = req.body;
    const isTokenValid = userValidationService(userViewModel.username, userViewModel.token);
    if (!isTokenValid) {
      res.status(401).json({ message: 'Unauthorithed' });
      return;
    }

    const permissions: UserPermissionsViewModel | undefined = await getUserPermissions(userViewModel.username);
    if (!permissions) {
      res.status(202).json({ message: 'No permissions found' });
      return;
    }

    res.status(200).json({ message: `User permissions for ${userViewModel.username}`, permissions });
  } catch {
    res.status(500).json({ message: 'Error on getting permissions' });
  }
}
