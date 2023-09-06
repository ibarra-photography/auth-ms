import {describe, expect, it} from 'vitest';

import { findUser } from '../findUser';
import { LoginViewModel } from '../../viewModels/loginViewModel';


describe("Find user", () => { 
   it("should find admin",async ()=> { 
        const user: LoginViewModel|undefined  = await findUser('admin')
        
        expect(user).not.toBe(undefined);
        expect(user!.username).toBe("admin");
    }) 
})
