import { Router, Request, Response } from 'express';

import { registerUserController } from './controllers/registerUserController';
import { validateUserController } from './controllers/validateUserController';
import { loginController } from './controllers/loginController';
import { generateInvitationController } from './controllers/generateInvitationController';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Authentication service is up' });
});

router.post('/generateInvitation', generateInvitationController);
router.post('/registerUser', registerUserController);
router.post('/login', loginController);
router.post('/validateUser', validateUserController);

router.get('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found in authentication router! ' });
});
