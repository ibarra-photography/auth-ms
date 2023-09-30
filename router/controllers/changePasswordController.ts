import { Request, Response } from 'express';

import { userValidationService } from '../../service/validation/userValidationService';
import { findUser } from '../../service/dataBaseConnection/findUser';
import { UpdatePasswordModel, updatePassword } from '../../service/dataBaseConnection/updatePassword';

import { textToHash } from '../../application/passwordEncriptation/textToHash';

import { ChangePasswordViewModel } from '../../service/viewModels/changePasswordViewModel';

export async function changePasswordController(req: Request, res: Response) {
  const changePasswordViewModel: ChangePasswordViewModel = req.body;

  const isTokenValid = userValidationService(changePasswordViewModel.username, changePasswordViewModel.token);
  if (!isTokenValid) {
    res.status(401).json({ message: 'Unauthorithed' });
    return;
  }

  const userViewModel = await findUser(changePasswordViewModel.username);
  if (!userViewModel) {
    res.status(403).json({ message: 'Invalid username o password' });
    return;
  }
  const oldPasswordHashed = await textToHash(changePasswordViewModel.oldPassword);
  if (userViewModel!.password! !== oldPasswordHashed) {
    res.status(403).json({ message: 'invalid username or password' });
    return;
  }

  const newPasswordHashed = await textToHash(changePasswordViewModel.newPassword);
  const updatePasswordModel: UpdatePasswordModel = {
    username: userViewModel!.username,
    password: newPasswordHashed
  };
  await updatePassword(updatePasswordModel);

  res.status(202).json({ message: 'Password update' });
}
