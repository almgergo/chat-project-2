import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FilterDto } from '../model/filter-dto';
import { Gender } from '../model/gender.enum';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  minAge = 20;
  submitted = false;

  @Input() filter: FilterDto = new FilterDto(20);
  @ViewChild('sliderElement') ageSlider: IonRangeSliderComponent;

  genders: any[] = [];
  genderDropdownClosed = true;

  
  termTarget$ = new Subject<NgbDropdown>();

  constructor(config: NgbDropdownConfig) {
    config.autoClose=false;
    this.genders = this.enumValues(Gender);

    this.termTarget$
    .debounceTime(100)
    .subscribe(dropdown => {
      if (this.genderDropdownClosed) {
        dropdown.close();
      } 
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    return false;
  }

  enumValues(Enum) {
    return Object.values(Enum);
  }

  targetGenderButtonText(): string {
    let text = '';
    if (this.filter.preferredGender && this.filter.preferredGender.length > 0) {
      this.filter.preferredGender.forEach(g => text += g + ' ');
    } else {
      text = 'Your partner\'s gender';
    }
    return text;
  }

  closeDropdownSoon(userGenderDropdown: NgbDropdown) {
    userGenderDropdown.close();
  }
 
  
  shiftSlider(shift: number) {
    console.log(this.ageSlider);
  }
}
