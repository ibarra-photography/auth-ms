import { Request, Response } from 'express';
import { LoginViewModel } from '../../service/viewModels/loginViewModel';
import { findUser } from '../../service/dataBaseConnection/findUser';
import { textToHash } from '../../application/passwordEncriptation/textToHash';
import Token from '../../domain/token/token';

export const loginController = async (req: Request, res: Response) => {
  try {
    const loginUser: LoginViewModel = req.body;

    const userViewModel = await findUser(loginUser.username);
    const hashPassword = await textToHash(loginUser.password);
    if (userViewModel!.password! !== hashPassword) throw new Error('Invalid username or password');
    const token = new Token();
    token.generateToken(loginUser.username);
    const tokenFromUser = token.getToken();

    res.status(200).json({ token: tokenFromUser, message: 'Success!' });
  } catch (error: Error | unknown) {
    console.log(error);
    res.status(500).json({ message: 'Error on login' });
  }
};
