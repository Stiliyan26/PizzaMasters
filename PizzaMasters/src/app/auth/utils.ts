import { AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailPattern = /.{4,}@(abv|gmail)\.(bg|com)/;

    if (!value) {
        return null
    }

    if (!emailPattern.test(value)) {
        return {
            email: true
        }
    }

    return null
}


export function passwordMatch(passwordFormControl: AbstractControl): ValidationErrors | null {
    const passwordGroup = passwordFormControl.parent as FormGroup;

    if (!passwordGroup) {
        return null;
    }

    const { password, rePassword } = passwordGroup.controls;

    if (password.value !== rePassword.value) {
        return {
            passwordMatch: true
        }
    }

    return null;
}

