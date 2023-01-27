import { PaymentMethod } from "src/app/enums/paymentMethod.enum";

export interface CardDetails {
    id: number;
    actionDate: string;
    totalPrice: number;
    paymentMethod: PaymentMethod;
    customerFullName: string;
    carPlateNumber: string;
    washWashService: string;
    employeeFullName: string;
}