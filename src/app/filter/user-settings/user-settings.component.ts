import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Gender } from '../model/gender.enum';
import { FilterDto } from '../model/filter-dto';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  termUser$ = new Subject<NgbDropdown>();
  genderDropdownClosed = true;
  minAge = 10;

  @Input() filter: FilterDto = new FilterDto(20, 20, 30);

  genders: any[] = [];

  constructor(config: NgbDropdownConfig) {
    config.autoClose = true;

    this.genders = this.enumValues(Gender);

    this.termUser$
      .debounceTime(100)
      .subscribe(dropdown => {
        if (this.genderDropdownClosed) {
          dropdown.close();
        }
      });

    this.filter.userAge = 10;
  }

  ngOnInit() {
  }

  enumValues(Enum) {
    return Object.values(Enum);
  }


  closeDropdownSoon(userGenderDropdown: NgbDropdown) {
    userGenderDropdown.close();
  }


}
