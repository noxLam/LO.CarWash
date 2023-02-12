import { UploaderImage } from "src/app/directive/image-uploader/UploaderImage.data";
import { Car } from "../cars/car.model";

export interface CustomerDetails {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    cars: Car[];
    images: UploaderImage[];
}