import jwt from 'jsonwebtoken';

interface UsernameToken {
  username: string;
}

const SECRET_KEY = 'SUPER_SECRET_KEY';

class Token {
  token: string;

  constructor() {
    this.token = '';
  }

  generateToken(username: string) {
    this.token = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: '30min'
    });
  }
  getUser(token: string) {
    const tokenObject = jwt.verify(token, SECRET_KEY) as UsernameToken;
    if (!tokenObject) throw new Error('Error on get user from token');
    return tokenObject!.username!;
  }

  getToken() {
    return this.token;
  }
  /*
   *  verify(tokenToVerify, username) {
   *    try {
   *      console.log('verify...');
   *      const { username: usernameToken, exp: expirationTime } = jwt.verify(tokenToVerify, SECRET_KEY);
   *
   *      if (expirationTime > 0 && username == usernameToken) return true;
   *
   *      return false;
   *    } catch (error) {
   *      console.log('error', error);
   *      return false;
   *    }
   *  }
   */
}

export default Token;
