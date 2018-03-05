import { Component, OnInit, Input } from '@angular/core';
import { FilterDto } from '../model/filter-dto';

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.css']
})
export class AgeInputComponent implements OnInit {

  @Input() minAge: number;
  @Input() filter: FilterDto;

  constructor() { }

  ngOnInit() {
  }

  mouseWheelUpFunc(event) {
    if (this.filter.userAge !== undefined) {
      this.filter.userAge++;
    } else {
      this.filter.userAge = this.minAge;
    }
  }

  mouseWheelDownFunc(event){
    if (this.filter.userAge !== undefined && this.filter.userAge > this.minAge) {
      this.filter.userAge--;
    } else if (this.filter.userAge === undefined){
      this.filter.userAge = this.minAge;
    }
  }

  checkAge() {
    if (this.filter.userAge < this.minAge) {
      this.filter.userAge = this.minAge;
    }
  }

}
