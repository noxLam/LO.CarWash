import { Car } from "../cars/car.model";

export interface CustomerDetails {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    cars: Car[];
}