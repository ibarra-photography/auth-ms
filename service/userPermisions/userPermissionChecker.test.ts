import { describe, it, expect } from 'vitest';
import { userPermissionChecker, Permissions } from './userPermissionChecker';

describe('User permissions checker', () => {
  it('should have admin permissions', async () => {
    const usernmae = 'admin';
    const permissions: Permissions[] = ['admin'];

    const hasPermissions = await userPermissionChecker(usernmae, permissions);

    expect(hasPermissions).toBe(true);
  });
});
