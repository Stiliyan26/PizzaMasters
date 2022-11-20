import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IAuthState } from './+store';
import { loginReducer, registerReducer } from './+store/reducers';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature<IAuthState>('auth', {
      login: loginReducer,
      register: registerReducer
    })
  ]
})
export class AuthModule { }
