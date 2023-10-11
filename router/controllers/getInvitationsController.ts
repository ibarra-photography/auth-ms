import { Request, Response } from "express";
import { userValidationService } from "../../service/validation/userValidationService";
import { UserPermissionsViewModel } from "../../service/viewModels/userPermissionsViewModel";
import { getUserPermissions } from "../../service/dataBaseConnection/getUserPermission";
import { getInvitationsDb } from "../../service/dataBaseConnection/getInvitationsDb";

export async function getInvitationsController (req: Request, res:Response) { 
    try { 
    
    const headers= req.headers;
    if (!headers.username) { 
        res.status(400).json({message: "username not found"});
        return;
    }
    if(!headers.token) { 
        res.status(400).json({message:"Token not found"})
        return
    }
    const {username, token} = headers as {username:string, token:string};
    const isTokenValid = userValidationService(username, token);
    if (!isTokenValid) res.status(401).json({ message: 'Unauthorithed' });

    const permissions: UserPermissionsViewModel | undefined = await getUserPermissions(username);
    if (!permissions || !permissions!.invite) {
      console.log('permissions: ', permissions);
      console.log(`${username} has no invitation permission`);
      res.status(403).json({ message: 'Forbiden' });
      return;
    }
    
    const invitations = await getInvitationsDb();
    res.status(200).send(invitations);
    }
    catch{ 
        res.status(500).json({message:"Error fetching invitations"})
    }
}
