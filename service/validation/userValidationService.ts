import Token from '../../domain/token/token';

export function userValidationService(username: string, token: string) {
  const tokenWorker = new Token();
  const userFromToken = tokenWorker.getUser(token);

  if (username !== userFromToken) {
    return false;
  }

  return true;
}
