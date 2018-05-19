import { Gender } from './gender.enum';

export class FilterDto {
    userInterests?: string[];

    userGender?: Gender;
    userAge?: number;

    preferredGender?: Gender[];
    preferredAgeMin?: number;
    preferredAgeMax?: number;

    constructor(startAge: number, min: number, max: number) {
        this.userAge = startAge;
        this.preferredAgeMax = max;
        this.preferredAgeMin = min;
    }
}
