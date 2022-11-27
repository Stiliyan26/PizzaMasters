import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPizza } from 'src/app/core/interfaces/pizza';
import { PizzaService } from 'src/app/core/pizza.service';
import { endShowDialogProcess } from '../+store/actions';
import { IPizzaModuleState } from '../+store/reducers';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  isDialogViewed$ = this.store.select((pizzaState) => pizzaState.pizza.dialog.viewDialog);

  @Input() pizzaId: string;
  @Input() pizza: IPizza;

  constructor(
    private pizzaService: PizzaService,
    private store: Store<IPizzaModuleState>,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  cancelHandler() {
    this.store.dispatch(endShowDialogProcess());
  }

  deleteHandler() {
    this.pizzaService.deletePizzaById$(this.pizzaId)
      .subscribe({
        next: () => {
          this.store.dispatch(endShowDialogProcess());
          this.route.navigate(['/pizza/menu']);
        } 
      });
  }
}
