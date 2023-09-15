import { describe, it, expect } from 'vitest';
import { UserPermissionsViewModel } from '../../viewModels/userPermissionsViewModel';
import { getUserPermissions } from '../getUserPermission';

describe('Get users permissions ', () => {
  it('permission should be booleans', async () => {
    const username = 'admin';

    const userPermission: UserPermissionsViewModel | undefined = await getUserPermissions(username);

    expect(typeof userPermission!.invite).toBe('boolean');
  });
});
