import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPizza } from 'src/app/core/interfaces/pizza';
import { IUser } from 'src/app/core/interfaces/user';
import { PizzaService } from 'src/app/core/pizza.service';
import { startLoadingProcess, endLoadingProcess, menuDataState } from '../+store/actions';
import { IPizzaModuleState } from '../+store/reducers';
import { loadingProcess } from '../+store/selectors';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css', './my-posts-responsive.css']
})
export class MyPostsComponent implements OnInit {
  isLoading$: Observable<boolean> = this.store.select(loadingProcess);
  allPizzasByOwner$: Observable<IPizza[]> = this.store.select((pizzaState) => pizzaState.pizza.menu.pizzas);
  currentUser$: Observable<IUser> = this.authService.currentUser$;

  allPizzasByOwner: IPizza[];
  currentUserId: string;

  constructor(
    private store: Store<IPizzaModuleState>,
    private pizzaService: PizzaService,
    private authService: AuthService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('My Posts');

    this.store.dispatch(startLoadingProcess());

    this.currentUser$
      .subscribe({
        next: (currentUser) => {
          this.currentUserId = currentUser._id;
        }
      })

    this.pizzaService.getAllPizzasByOwner$(this.currentUserId)
      .subscribe({
        next: (allPizzasData) => {
          setTimeout(() => {
            this.store.dispatch(endLoadingProcess());
            this.store.dispatch(menuDataState({ pizzas: allPizzasData }));

            this.allPizzasByOwner = allPizzasData;
          }, 800);
        },
        error: (err) => {
          console.log('Error:', err.error);
        }
      })
  }
}
