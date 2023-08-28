import { Router, Request, Response } from 'express';

import { ValidateUserViewModel } from 'service/viewModels/validateUserViewModel';
import { LoginVieModel } from 'service/viewModels/loginViewModel';

import { registerUserController } from './controllers/registerUserController';

export const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Authentication service is up' });
});

const validateUserController = (req: Request, res: Response) => {
  try {
    const userToValidate: ValidateUserViewModel = req.body;
    res.status(200).json({ message: 'User validated', isValid: true });
  } catch {
    res.status(500).json({ message: 'Error on user validation' });
  }
};

const loginController = (req: Request, res: Response) => {
  try {
    const loginUser: LoginVieModel = req.body;
    res.status(200).json({ token: '' });
  } catch {
    res.status(500).json({ message: 'Error on user login' });
  }
};

const generateInvitationController = (req: Request, res: Response) => {
  const invitationRequest: ValidateUserViewModel = req.body;
  // Validate user
  // Check permissions
  // Generate invitation

  try {
    res.status(202).json({ message: '' });
  } catch {
    res.status(500).json({ message: ' Error on invitation generation' });
  }
};

router.post('/generateInvitation', generateInvitationController);
router.post('/registerUser', registerUserController);
router.post('/login', loginController);
router.post('/validateUser', validateUserController);

router.get('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found in authentication router! ' });
});
