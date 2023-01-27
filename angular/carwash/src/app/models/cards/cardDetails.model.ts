import { PaymentMethod } from "src/app/enums/paymentMethod.enum";

export interface CardDetails {
    id: number;
    actionDate: string;
    totalPrice: number;
    paymentMethod: PaymentMethod;
    customerFullName: string;
    carPlateNumber: string;
    washService: string;
    employeeFullName: string;
}