import { Request, Response } from 'express';

import { ValidateUserViewModel } from 'service/viewModels/validateUserViewModel';
import { userValidationService } from '../../service/validation/userValidationService';
import { getUserPermissions } from '../../service/dataBaseConnection/getUserPermission';
import { UserPermissionsViewModel } from '../../service/viewModels/userPermissionsViewModel';
import { invitaionGenerator } from '../../application/utils/invitationGenerator';
import { insertInvitation } from '../../service/dataBaseConnection/insertInvitation';
import { InvitationViewModel } from '../../service/viewModels/invitationViewModel';

export const generateInvitationController = async (req: Request, res: Response) => {
  try {
    const invitationRequest: ValidateUserViewModel = req.body;

    const isTokenValid = userValidationService(invitationRequest.username, invitationRequest.token);
    if (!isTokenValid) res.status(401).json({ message: 'Unauthorithed' });

    const permissions: UserPermissionsViewModel | undefined = await getUserPermissions(invitationRequest.username);
    if (!permissions || !permissions!.invite) {
      console.log('permissions: ', permissions);
      console.log(`${invitationRequest.username} has no permission`);
      res.status(403).json({ message: 'Forbiden' });
      return;
    }

    const invitation = invitaionGenerator();
    const invitationToInsert: InvitationViewModel = { username: invitationRequest.username, invitation: invitation.toString()}
    await insertInvitation(invitationToInsert)

    res.status(202).json({ message: 'Invitation generated!', invitation });
  } catch {
    res.status(500).json({ message: ' Error on invitation generation' });
  }
};
