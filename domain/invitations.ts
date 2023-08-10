export interface Invitations {
  invitationCode: string;
  isValid: boolean;
  generationDate: Date;
  usageDate: Date;
  generatorsUserId: number;
  consumerUserId: number;
}
