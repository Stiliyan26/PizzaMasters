import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPizza } from './interfaces/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createNewPizza$(pizzaData: IPizza, userId: string): Observable<IPizza> {
    return this.httpClient
      .post<IPizza>(`${environment.apiUrl}/pizza/create`, { pizzaData, userId });
  }
}
