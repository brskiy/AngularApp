export interface ITransferInfo {
    expiryMonth: number;
    expiryYear: number;
    senderCardNumber: string;
    recipientCardNumber: string;
    fullName: string;
    docDate?: Date;
    sum: number;
    id?: string;
    userId?: string;
}
