import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive, Input } from "@angular/core";

@Directive({
  selector: '[appMinAge]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinAgeValidatorDirective, multi: true}]
})
export class MinAgeValidatorDirective implements Validator {
  @Input('appMinAge') minAge: number;

  validate(control: AbstractControl): {[key: string]: any} {
    return control.value ? minAgeValidator(this.minAge)(control)
                              : null;
  }
}

export function minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const forbidden = minAge > control.value; 
      return forbidden ? {'minAge': {value: control.value}} : null;
    };
  }  