import { CustomerList } from "../customers/customerList.model";

export interface CarList {
    id: number;
    model: string;
    plateNumber: string;
    customers: CustomerList[];
}