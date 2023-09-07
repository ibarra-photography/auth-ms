import { describe, expect, it } from 'vitest';
import { textToHash } from '../textToHash';

describe('Text to hash', () => {
  it('should convert a into hass', async () => {
    const a = 'a';
    const expectedHash = 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb';

    const aHash = await textToHash(a);

    expect(aHash).toBe(expectedHash);
  });
});
