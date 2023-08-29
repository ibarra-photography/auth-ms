import { ValidateUserViewModel } from 'service/viewModels/validateUserViewModel';
import {  Request, Response } from 'express';

export const validateUserController = (req: Request, res: Response) => {
  try {
    const userToValidate: ValidateUserViewModel = req.body;
    res.status(200).json({ message: 'User validated', isValid: true });
    console.log(`validating ${userToValidate}`);
  } catch {
    res.status(500).json({ message: 'Error on user validation' });
  }
};
