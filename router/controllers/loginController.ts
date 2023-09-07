import { Request, Response } from 'express';
import { LoginViewModel } from '../../service/viewModels/loginViewModel';
import { findUser } from '../../service/dataBaseConnection/findUser';

export const loginController = async (req: Request, res: Response) => {
  try {
    const loginUser: LoginViewModel = req.body;

    const userViewModel = await findUser(loginUser.username);
    if (userViewModel!.password! !== loginUser.password) throw new Error('Invalid username or password');

    res.status(200).json({ token: '', message:"Success!" });
  } catch (error: Error | unknown) {
    console.log(error);
    res.status(500).json({ message: error ? error : 'Error on login' });
  }
};
