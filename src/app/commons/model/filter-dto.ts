import { Gender } from "./gender.enum";

export class FilterDto {
    userInterests?: string[];

    userGender?: Gender;
    userAge?: number;

    preferredGender?: Gender[];
    preferredAgeMin?: number;
    preferredAgeMax?: number;

    constructor(startAge: number) {
        this.userAge = startAge;
    }
}