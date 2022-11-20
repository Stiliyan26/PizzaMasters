import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { IRootState } from './+store';
import { Observable, tap } from 'rxjs';
import { IUser } from './core/interfaces/user';
import { environment } from 'src/environments/environment';

interface IRegisterUserData {
  username: string,
  email: string,
  password: string,
  rePassword: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<IRootState>
  ) { }

  register$(userData: IRegisterUserData): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}/users/register`, userData);
  }
}
