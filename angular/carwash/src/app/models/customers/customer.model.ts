import { Car } from "../cars/car.model";

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    carIds: number[];
}