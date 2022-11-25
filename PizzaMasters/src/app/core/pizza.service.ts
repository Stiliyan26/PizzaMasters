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

  getAllPizzas$(): Observable<IPizza[]> {
    return this.httpClient
      .get<IPizza[]>(`${environment.apiUrl}/pizza/menu`);
  }

  loadPizzaById$(pizzaId: string): Observable<IPizza> {
    return this.httpClient
      .get<IPizza>(`${environment.apiUrl}/pizza/menu/${pizzaId}`);
  }

  orderPizza$(pizzaId, userId): Observable<void> {
    return this.httpClient
      .put<void>(`${environment.apiUrl}/pizza/order/${pizzaId}`, { pizzaId, userId });
  }

  deletePizzaById$(pizzaId: string): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.apiUrl}/pizza/delete/${pizzaId}`,);
  }

  editPizzaById$(pizzaData: IPizza, pizzaId, userId: string): Observable<void> {
    return this.httpClient
      .put<void>(`${environment.apiUrl}/pizza/edit/${pizzaData._id}`, { pizzaData, pizzaId, userId });
  }
}
