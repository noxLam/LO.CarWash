import { Car } from "../car.model";

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    cars: Car[];
}