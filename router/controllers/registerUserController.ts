import { Request, Response } from 'express';
import { RegisterUserViewModel } from '../../service/viewModels/registerUserViewModel';

import { insetUser } from '../../service/dataBaseConnection/insertUser';

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const userViewModel: RegisterUserViewModel = req.body;
    await insetUser(userViewModel);
    res.status(202).json({ message: 'User added' });
  } catch {
    res.status(500).json({ message: 'Error adding user' });
  }
};