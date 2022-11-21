import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { IRootState } from './+store';
import { map, Observable, tap } from 'rxjs';
import { IUser } from './core/interfaces/user';
import { environment } from 'src/environments/environment';
import { login, logout } from './+store/actions';
import { StorageService } from './core/storage.service';

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

  currentUser$ = this.store.select(globalState => globalState.currentUser);
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  constructor(
    private httpClient: HttpClient,
    private store: Store<IRootState>,
    private localStorage: StorageService
  ) { }

  register$(userData: IRegisterUserData): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}/users/register`, userData);
  }

  authenticate() {
    const currentUser: IUser = JSON.parse(this.localStorage.getUserLocalStorage());
    this.handleLogin(currentUser);
  }

  handleLogin(newUser: IUser): void {
    this.store.dispatch(login({ user: newUser }))
  }

  handleLogout() {
    this.localStorage.logoutUserLocalStorage();
    this.store.dispatch(logout());
  }
}
