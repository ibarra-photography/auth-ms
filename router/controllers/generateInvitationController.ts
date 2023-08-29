import { Request, Response } from 'express';
import { ValidateUserViewModel } from 'service/viewModels/validateUserViewModel';

export const generateInvitationController = (req: Request, res: Response) => {
  const invitationRequest: ValidateUserViewModel = req.body;
  console.log(invitationRequest);
  // Validate user
  // Check permissions
  // Generate invitation

  try {
    res.status(202).json({ message: '' });
  } catch {
    res.status(500).json({ message: ' Error on invitation generation' });
  }
};
