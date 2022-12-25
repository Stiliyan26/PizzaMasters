import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces/user';
import { StorageService } from 'src/app/core/storage.service';
import { emailValidator } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './login-responsive.css']
})
export class LoginComponent implements OnInit {
  userDoesnNotExist: boolean;
  userInfoIncorecct: string;

  loginFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(5)])
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorage: StorageService,
    private router: Router
  ) { }

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.loginFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  showInvalidClass(controlName: string, sourceGroup: FormGroup = this.loginFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  ngOnInit(): void {
  }

  handleLogin(): void {
    const formData = {
      'email': this.loginFormGroup.value.email,
      'password': this.loginFormGroup.value.password
    }

    this.authService.login$(formData)
      .subscribe({
        next: (user: IUser) => {
          console.log(user)

          this.userDoesnNotExist = false;
          this.authService.handleLogin(user);
          this.localStorage.setUserLocalStorage(user);

          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.userDoesnNotExist = err.error.map(err => err.msg == 'User does not exist!'
            || err.msg == 'Email or Password is incorecct!');

          this.userInfoIncorecct = err.error.filter(err => err.msg == 'User does not exist!'
            || err.msg == 'Email or Password is incorecct!')[0].msg;
        }
      })
  }
}

