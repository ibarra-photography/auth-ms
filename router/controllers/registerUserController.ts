import { Request, Response } from 'express';
import { RegisterUserViewModel } from '../../service/viewModels/registerUserViewModel';

import { insetUser } from '../../service/dataBaseConnection/insertUser';
import { textToHash } from '../../application/passwordEncriptation/textToHash';
import { invitationsValidator } from '../../application/invitations/invitationsValidator';
import { markInvitationAsUsed } from '../../service/dataBaseConnection/markInvitationAsUsed';

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const userViewModel: RegisterUserViewModel = req.body;
    const isInvitationValid = await invitationsValidator(userViewModel.invitation);
    if (!isInvitationValid) {
      res.status(409).json({ message: 'invalid invitation' });
      return;
    }
    userViewModel.password = await textToHash(userViewModel.password);
    await insetUser(userViewModel);
    await markInvitationAsUsed(userViewModel.invitation);
    res.status(202).json({ message: 'User added' });
  } catch (error: Error | unknown) {
    // restore and invitation
    console.warn(Error.name);
    res.status(500).json({ message: 'Error adding user' });
  }
};
