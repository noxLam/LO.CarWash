import { PaymentMethod } from "src/app/enums/paymentMethod.enum";

export interface Card {
    id: number;
    actionDate: string;
    paymentMethod: PaymentMethod;
    customerId: number;
    carId: number;
    washId: number;
    employeeId: number;
}