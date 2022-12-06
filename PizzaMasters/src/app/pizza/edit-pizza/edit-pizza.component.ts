import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, mergeMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPizza } from 'src/app/core/interfaces/pizza';
import { IUser } from 'src/app/core/interfaces/user';
import { PizzaService } from 'src/app/core/pizza.service';

@Component({
  selector: 'app-edit-pizza',
  templateUrl: './edit-pizza.component.html',
  styleUrls: ['./edit-pizza.component.css', './edit-pizza-responsive.css']
})
export class EditPizzaComponent implements OnInit {
  @ViewChild('editPizzaForm') editPizzaForm: NgForm;

  pizzaId: string;
  userId: string;

  pizza?: IPizza;
  currentUser: IUser

  constructor(
    private activatedRoute: ActivatedRoute,
    private pizzaService: PizzaService,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params
        .pipe(
          mergeMap(params => {
            this.pizzaId = params['pizzaId'];

            return this.pizzaService.loadPizzaById$(this.pizzaId);
          })
        ),

      this.authService.currentUser$
        .pipe(
          tap(currentUser => this.currentUser = currentUser)
        )
    ])
      .subscribe(([pizzaData, user]) => {
        this.pizza = pizzaData;
        this.userId = user._id;
      })
  }


  handleEditPizza(): void {
    this.pizzaService.editPizzaById$(this.editPizzaForm.value, this.pizzaId, this.userId)
      .subscribe({
        next: () => {
          this.route.navigate([`/pizza/menu/${this.pizzaId}`]);
        }
      })
  }

  handleCancel(): void {
    this.route.navigate([`/pizza/menu/${this.pizzaId}`]);
  }
}
