import { Injectable } from '@angular/core';
import { IUser } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  initialValue = {
    username: '',
    email: '',
    password: '',
    _id: '',
    __v: 0
  }

  getUserLocalStorage() {
    return localStorage.getItem('user');
  }

  setUserLocalStorage(data: IUser) {
    return localStorage.setItem('user', JSON.stringify(data));
  }

  logoutUserLocalStorage() {
    return localStorage.clear();
  }
}
