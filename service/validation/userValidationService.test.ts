import { describe, it, expect } from 'vitest';
import Token from '../../domain/token/token';
import { userValidationService } from './userValidationService';

describe('User validation service', () => {
  it('should return true for a valid token', () => {
    const tokenWorker = new Token();
    const username = 'John';
    tokenWorker.generateToken(username);
    const stringToken = tokenWorker.getToken();

    const isValidToken = userValidationService(username, stringToken);

    expect(isValidToken).toBe(true);
  });
});
