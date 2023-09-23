import { describe, it, expect } from 'vitest';

import { invitationsValidator } from './invitationsValidator';

describe('Invitation Validator', () => {
  it('It should return unvalid for invitation 445355', async () => {
    const isValid = await invitationsValidator('445355');

    expect(isValid).toBe(false);
  });
});
