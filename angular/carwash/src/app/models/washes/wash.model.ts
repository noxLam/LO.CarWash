import { WashType } from "src/app/enums/washType.enum";
import { Size } from "src/app/enums/size.enum";

export interface Wash {
    id: number;
    washType: WashType;
    vehicleSize: Size;
    price: number;
}