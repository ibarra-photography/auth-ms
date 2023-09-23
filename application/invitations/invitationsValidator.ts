import { findInvitation } from '../../service/dataBaseConnection/findInvitation';

export async function invitationsValidator(invitationToValidate: string) {
  const invitation = await findInvitation(invitationToValidate);

  if (!invitation?.isValid) return false;

  return true;
}
