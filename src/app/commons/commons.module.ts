import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMainComponent } from './filter-main/filter-main.component';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { FilterComponent } from './filter/filter.component';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { MinAgeValidatorDirective } from './tools/age-validator.directive';
import { MouseWheelDirective } from './tools/mousewheel.directive';
import { AgeInputComponent } from './age-input/age-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiselectDropdownModule,
    NgbModule,
    IonRangeSliderModule,
    // Validators
  ],
  declarations: [FilterMainComponent, MultiSelectComponent, UserSettingsComponent, FilterComponent, MinAgeValidatorDirective, MouseWheelDirective, AgeInputComponent],
  exports: [FilterMainComponent, UserSettingsComponent],
})
export class CommonsModule { }
