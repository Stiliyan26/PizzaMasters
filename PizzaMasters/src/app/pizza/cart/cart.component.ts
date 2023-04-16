import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPizza } from 'src/app/core/interfaces/pizza';
import { IUser } from 'src/app/core/interfaces/user';
import { PizzaService } from 'src/app/core/pizza.service';
import { cartDataState, endCartLoadingProcess, startCartLoadingProcess } from '../+store/actions';
import { IPizzaModuleState } from '../+store/reducers';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isLoading$: Observable<boolean> = this.store.select((pizzaState => pizzaState.pizza.cart.isLoading));
  allPizzasInCart$: Observable<IPizza[]> = this.store.select(pizzaState => pizzaState.pizza.cart.pizzas);
  currentUser$: Observable<IUser> = this.authService.currentUser$;

  allPizzasInCart: IPizza[];
  currentUserId: string;
  totalPrice: Number = 0;

  constructor(
    private store: Store<IPizzaModuleState>,
    private pizzaService: PizzaService,
    private authService: AuthService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Cart');

    this.store.dispatch(startCartLoadingProcess());

    this.currentUser$
      .subscribe({
        next: (currentUser) => {
          this.currentUserId = currentUser._id
        }
      })

    this.pizzaService.getAllOrderedPizzas$(this.currentUserId)
      .subscribe({
        next: (pizzaData) => {
          setTimeout(() => {
            this.store.dispatch(endCartLoadingProcess());
            this.store.dispatch(cartDataState({ pizzas: pizzaData }));

            let sum = 0;

            for (let i = 0; i < pizzaData.length; i++) {
              sum += pizzaData[i].price;
            }

            this.totalPrice = sum;
            this.allPizzasInCart = pizzaData;
          }, 800);
        },
        error: (err) => {
          console.log('Error:', err.error);
        }
      })
  }
}
