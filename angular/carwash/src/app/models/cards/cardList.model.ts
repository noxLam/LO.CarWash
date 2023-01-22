import { PaymentMethod } from "src/app/enums/paymentMethod.enum";

export interface CardList {
    id: number;
    actionDate: string;
    paymentMethod: PaymentMethod;
    carPlateNumber: string;
    washWashService: string;
}