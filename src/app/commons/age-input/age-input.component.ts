import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FilterDto } from '../model/filter-dto';

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.css']
})
export class AgeInputComponent implements OnInit {

  @Input() minAge = 10;
  @Input() maxAge = 100;
  age = 20;

  @Output('ageChanged') ageChanged: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  mouseWheelUpFunc(event) {
    if (this.age) {
      if (this.age >= this.maxAge) {
        this.age = this.maxAge;
      } else if (this.age < this.minAge) {
        this.age = this.minAge;
      } else {
        this.age++;
      }
    }

    this.emitAge();
  }

  mouseWheelDownFunc(event) {
    if (this.age) {
      if (this.age > this.maxAge) {
        this.age = this.maxAge;
      } else if (this.age <= this.minAge) {
        this.age = this.minAge;
      } else {
        this.age--;
      }
    } else {
      this.age = 20;
    }

    this.emitAge();
  }

  checkAge() {
    if (this.age < this.minAge) {
      this.age = this.minAge;
    } else if (this.age > this.maxAge) {
      this.age = this.maxAge;
    }
    this.emitAge();
  }

  emitAge() {
    this.ageChanged.emit(this.age);
  }

}
