import { Router, Request, Response } from 'express';

import { registerUserController } from './controllers/registerUserController';
import { loginController } from './controllers/loginController';
import { generateInvitationController } from './controllers/generateInvitationController';
import { deleteUserController } from './controllers/deleteUserController';
import { changePasswordController } from './controllers/changePasswordController';
import { userPermissionsController } from './controllers/userPermissionsController';
import { getInvitationsController } from './controllers/getInvitationsController';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Authentication service is up' });
});

router.post('/generateInvitation', generateInvitationController);
router.post('/registerUser', registerUserController);
router.post('/login', loginController);
router.post('/deleteUser', deleteUserController);
router.post('/userPermission', userPermissionsController);
router.post('/changePassword', changePasswordController);
router.get('/getInvitations', getInvitationsController)

router.get('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found in authentication router! ' });
});
