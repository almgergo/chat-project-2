import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMainComponent } from './filter-main/filter-main.component';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiselectDropdownModule,
    NgbModule
  ],
  declarations: [FilterMainComponent]
})
export class CommonsModule { }
