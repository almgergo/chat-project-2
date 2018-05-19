import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMainComponent } from './filter-main/filter-main.component';
import { FilterComponent } from './filter/filter.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgeInputComponent } from './age-input/age-input.component';
import { CommonsModule } from '../commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiselectDropdownModule,
    NgbModule,
    CommonsModule
  ],
  declarations: [FilterMainComponent, FilterComponent, UserSettingsComponent, AgeInputComponent],
  exports: [FilterMainComponent]
})
export class FilterModule { }
