import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PizzaService } from 'src/app/core/pizza.service';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces/user';
import { mergeMap, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.component.html',
  styleUrls: ['./create-pizza.component.css', './create-pizza-responsive.css']
})
export class CreatePizzaComponent implements OnInit {
  @ViewChild('createPizzaForm') createPizzaForm: NgForm;

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  currentUser: IUser;

  constructor(
    private pizzaService: PizzaService,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  handleCreatePizza(): void {
    this.currentUser$
      .pipe(
        tap(currenttUser => this.currentUser = currenttUser),
        mergeMap(() => this.pizzaService.createNewPizza$(this.createPizzaForm.value, this.currentUser._id))
      )
      .subscribe({
        next: (data) => {

          this.route.navigate(['/pizza/menu']);
        },
        error: (err) => {
          console.log('Error:', err.error);
        }
      });
  };

  handleCancel(): void {
    this.route.navigate(['/pizza/menu']);
  }
}
