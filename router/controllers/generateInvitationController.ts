import { Request, Response } from 'express';

import { ValidateUserViewModel } from 'service/viewModels/validateUserViewModel';
import { userValidationService } from '../../service/validation/userValidationService';
import { getUserPermissions } from "../../service/dataBaseConnection/getUserPermission";
import { UserPermissionsViewModel } from '../../service/viewModels/userPermissionsViewModel';

export const generateInvitationController = async (req: Request, res: Response) => {
  const invitationRequest: ValidateUserViewModel = req.body;

  const isTokenValid = userValidationService(invitationRequest.username, invitationRequest.token);
  if (!isTokenValid) res.status(401).json({ message: 'Unauthorithed' });

    const permissions:UserPermissionsViewModel | undefined = await getUserPermissions(invitationRequest.username);
   if( !permissions || !permissions!.invite) { 
        console.log(`${invitationRequest.username} has no permission`)
        res.status(403).json({message: "Forbiden"});
    }
  // Generate invitation

  try {
    res.status(202).json({ message: '' });
  } catch {
    res.status(500).json({ message: ' Error on invitation generation' });
  }
};
