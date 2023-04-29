import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { priceValidator } from '../pizza/pizzaUtil';


@Directive({
  selector: '[priceValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PriceValidatorDirective, multi: true}]
})
export class PriceValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
      return priceValidator(control);
  }
}
