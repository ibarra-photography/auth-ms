import { describe, it, expect } from 'vitest';
import { getInvitationsDb } from '../getInvitationsDb';


describe("Get invitations DB", ()=> { 
    it("should be invitations", async ()=>{ 
        const invitations = await getInvitationsDb();

        expect(invitations!.length! > 1).toBe(true);
    })
})
