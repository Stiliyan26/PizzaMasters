import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, mergeMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPizza } from 'src/app/core/interfaces/pizza';
import { IUser } from 'src/app/core/interfaces/user';
import { PizzaService } from 'src/app/core/pizza.service';

@Component({
  selector: 'app-details-pizza',
  templateUrl: './details-pizza.component.html',
  styleUrls: ['./details-pizza.component.css', './details-pizza-responsive.css']
})
export class DetailsPizzaComponent implements OnInit {

  isLoggedIn$ = this.authService.isLoggedIn$;

  refereshPizzaRequest$ = new BehaviorSubject(undefined);

  isUserOwner: boolean = false;
  canOrder: boolean = false;

  currentUser: IUser;
  pizza?: IPizza;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pizzaService: PizzaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params
        .pipe(
          mergeMap(params => {
            const pizzaId = params['pizzaId'];

            return this.refereshPizzaRequest$
              .pipe(
                mergeMap(() => this.pizzaService.loadPizzaById(pizzaId))
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
}

