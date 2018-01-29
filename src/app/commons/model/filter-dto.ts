import { Gender } from "./gender.enum";

export class FilterDto {
    interests?: string[];
    myGender?: Gender;
    preferredGender?: Gender[];
}