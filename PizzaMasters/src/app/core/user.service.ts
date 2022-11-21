import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storage: StorageService,
    private httpClient: HttpClient,
    private localStorage: StorageService
  ) { }

  getUserById$(userId: string): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/users/profile`, userId)
  }
}
