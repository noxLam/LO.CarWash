import { Customer } from "../customers/customer.model";

export interface Car {
    id: number;
    make: string;
    model: string;
    plateNumber: string;
    customerIds: number[];
}