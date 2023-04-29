import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, mergeMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPizza } from 'src/app/core/interfaces/pizza';
import { IUser } from 'src/app/core/interfaces/user';
import { PizzaService } from 'src/app/core/pizza.service';
import { startShowDialogProcess } from '../+store/actions';
import { IPizzaModuleState } from '../+store/reducers';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-details-pizza',
  templateUrl: './details-pizza.component.html',
  styleUrls: ['./details-pizza.component.css', './details-pizza-responsive.css']
})
export class DetailsPizzaComponent implements OnInit {
  isDialogViewed$ = this.store.select((pizzaState) => pizzaState.pizza.dialog.viewDialog);
  isLoggedIn$ = this.authService.isLoggedIn$;

  refereshPizzaRequest$ = new BehaviorSubject(undefined);

  isUserOwner: boolean = false;
  canOrder: boolean = false;

  currentUser: IUser;
  pizza?: IPizza;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pizzaService: PizzaService,
    private authService: AuthService,
    private store: Store<IPizzaModuleState>,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Details');

    combineLatest([
      this.activatedRoute.params
        .pipe(
          mergeMap(params => {
            const pizzaId = params['pizzaId'];

            return this.refereshPizzaRequest$
              .pipe(
                mergeMap(() => this.pizzaService.loadPizzaById$(pizzaId)),
              )
          })
        ),

      this.authService.currentUser$
        .pipe(
          tap(currentUser => this.currentUser = currentUser)
        )
    ])
      .subscribe(([pizza, user]) => {
        this.pizza = pizza;
        this.canOrder = user && !this.pizza.ordered.includes(user?._id);
        this.isUserOwner = user && user?._id == pizza?.ownerId;
      })
  }

  orderPizzaById(pizzaId: string, userId: string): void {
    this.pizzaService.orderPizza$(pizzaId, userId)
      .subscribe({
        next: () => {
          this.refereshPizzaRequest$.next(undefined);
        },
        error: (err) => {
          console.log(err.error);
        }
      })
  }

  deletePizzaHandler() {
    this.store.dispatch(startShowDialogProcess());
  }

  deleteOrderHandler(pizza: IPizza, userId: string): void {
    this.pizzaService.deleteOrder$(pizza, userId)
      .subscribe({
        next: () => {
          this.refereshPizzaRequest$.next(undefined);
        },
        error: (err) => {
          console.log(err.error);
        }
      })
  }
}

