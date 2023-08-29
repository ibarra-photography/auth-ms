import { LoginVieModel } from 'service/viewModels/loginViewModel';
import { Request, Response } from 'express';

export const loginController = (req: Request, res: Response) => {
  try {
    const loginUser: LoginVieModel = req.body;
    console.log(loginUser);
    res.status(200).json({ token: '' });
  } catch {
    res.status(500).json({ message: 'Error on user login' });
  }
};
