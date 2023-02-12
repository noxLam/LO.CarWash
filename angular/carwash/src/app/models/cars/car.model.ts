import { UploaderImage } from "src/app/directive/image-uploader/UploaderImage.data";

export interface Car {
    id: number;
    make: string;
    model: string;
    plateNumber: string;
    images: UploaderImage[];
}