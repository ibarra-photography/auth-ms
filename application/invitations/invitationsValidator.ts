import { findInvitation } from "../../service/dataBaseConnection/findInvitation";

export async function invitationsValidator(invitationToValidate: string) { 
    const invitation = await findInvitation(invitationToValidate);

    if(invitation?.isValid) return true

    if(invitation?.invitationCode.toString() === invitationToValidate) return true

    return false

}
