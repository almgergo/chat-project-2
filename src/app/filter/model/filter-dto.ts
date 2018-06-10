import { Gender } from './gender.enum';
import { Topic } from '../../commons/model/topic-dto';

export class FilterDto {
    topics?: Topic[];

    userGender?: Gender;
    userAge?: number;

    preferredGender?: Gender[];
    preferredAgeMin?: number;
    preferredAgeMax?: number;

    userCity: string;
    preferredCity: string;

    constructor(startAge: number, min: number, max: number) {
        this.userAge = startAge;
        this.preferredAgeMax = max;
        this.preferredAgeMin = min;
        this.userCity = '';
        this.preferredCity = '';
    }

    public clear() {
        this.topics = [];

        this.userGender = null;
        this.userAge = 20;
        this.userCity = '';

        this.preferredAgeMax = 30;
        this.preferredAgeMin = 20;
        this.preferredCity = '';
        this.preferredGender = [];
    }
}
