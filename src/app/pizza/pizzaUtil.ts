import { AbstractControl, ValidationErrors } from "@angular/forms";

export function priceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (value > 0) {
        return null;
    }
    
    return {
        price: true
    };
}