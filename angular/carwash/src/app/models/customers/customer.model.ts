import { UploaderImage } from "src/app/directive/image-uploader/UploaderImage.data";
import { Car } from "../cars/car.model";

export class Customer {
    id: number = 0;
    firstName: string = "";
    lastName: string = "";
    phoneNumber: string = "";
    carIds: number[] = [];
    images: UploaderImage[] = [];
}