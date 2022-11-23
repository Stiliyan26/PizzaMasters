import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPizza } from 'src/app/core/interfaces/pizza';
import { PizzaService } from 'src/app/core/pizza.service';
import { endLoadingProcess, menuDataState, startLoadingProcess } from '../+store/actions';
import { IPizzaModuleState } from '../+store/reducers';
import { loadingProcess } from '../+store/selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', './menu-responsive.css']
})
export class MenuComponent implements OnInit {
  isLoading$: Observable<boolean> = this.store.select(loadingProcess);
  allPizzas$: Observable<IPizza[]> = this.store.select((pizzaState) => pizzaState.pizza.menu.pizzas);

  allPizzas: IPizza[];

  constructor(
    private store: Store<IPizzaModuleState>,
    private pizzaService: PizzaService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(startLoadingProcess());

    this.pizzaService.getAllPizzas$()
      .subscribe({
        next: (allPizzasData) => {

          setTimeout(() => {
            this.store.dispatch(endLoadingProcess());
            this.store.dispatch(menuDataState({pizzas: allPizzasData}));

            this.allPizzas = allPizzasData;
          }, 1500);
        }
      })
  }

}
