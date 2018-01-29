import { Component, OnInit } from '@angular/core';
import { FilterDto } from '../model/filter-dto';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Gender } from '../model/gender.enum';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-filter-main',
  templateUrl: './filter-main.component.html',
  styleUrls: ['./filter-main.component.css']
})
export class FilterMainComponent implements OnInit{
  submitted = false;

  filter: FilterDto = new FilterDto();
  genders: string[] = [];

  optionsModel: number[];
  myOptions: IMultiSelectOption[];

  public model: any;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      // .merge() // for later
      .map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  onSelectChange() {
      console.log(this.optionsModel);
  }

  constructor() {
    this.genders = this.enumValues(Gender);
  }

  ngOnInit() {
    this.myOptions = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
    ];
  }

  onSubmit() {
    this.submitted = true;
    return false;
  }

  enumValues(Enum) {
    return Object.values(Enum);
    // for (let value in enumValues) {
    //   console.log(value);
    // }
  }

}
