import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { MinAgeValidatorDirective } from './tools/age-validator.directive';
import { MouseWheelDirective } from './tools/mousewheel.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiselectDropdownModule,
    NgbModule
    // Validators
  ],
  declarations: [ MultiSelectComponent, MinAgeValidatorDirective, MouseWheelDirective],
  exports: [MultiSelectComponent, MouseWheelDirective, MinAgeValidatorDirective],

})
export class CommonsModule { }
