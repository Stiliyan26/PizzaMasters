import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Store } from '@ngrx/store';
import { IAuthModuleState } from '../+store/reducers';
import { initializeRegisterState, registerProcessError, startRegisterProcess } from '../+store/actions';
import { registerIsPendingSelector } from '../+store/selectors';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { emailValidator, passwordMatch } from '../utils';
import { IUser } from 'src/app/core/interfaces/user';
import { StorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './register-responsive.css']
})
export class RegisterComponent implements OnInit {

  isRegisterPending$: Observable<boolean> = this.store.select(registerIsPendingSelector);

  emailIsTaken: boolean;
  emailIsTakenErrorMsg: string;

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    "passwords": new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [Validators.required, passwordMatch])
    })
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<IAuthModuleState>,
    private localStorage: StorageService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(initializeRegisterState())
  }

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  showInvalidClass(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }


  handleRegister(): void {
    this.store.dispatch(startRegisterProcess())

    const formData = {
      username: this.registerFormGroup.value.username,
      email: this.registerFormGroup.value.email,
      password: this.registerFormGroup.value.passwords.password,
      rePassword: this.registerFormGroup.value.passwords.rePassword
    }

    this.authService.register$(formData)
      .subscribe({
        next: (user: IUser) => {
          this.emailIsTaken = false;
          this.authService.handleLogin(user);
          this.localStorage.setUserLocalStorage(user);

          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.emailIsTaken = err.error.map(err => err.msg == 'Email is already taken!');
          this.emailIsTakenErrorMsg = err.error.filter(err => err.msg == 'Email is already taken!')[0].msg;
          // this.store.dispatch(registerProcessError({ errorMessage: this.emailIsTakenErrorMsg }));
        }
      });
  }
}
