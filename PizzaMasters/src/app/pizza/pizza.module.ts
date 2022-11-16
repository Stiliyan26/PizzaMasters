import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaRoutingModule } from './pizza-routing.module';
import { MenuComponent } from './menu/menu.component';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { EditPizzaComponent } from './edit-pizza/edit-pizza.component';


@NgModule({
  declarations: [
    MenuComponent,
    CreatePizzaComponent,
    EditPizzaComponent
  ],
  imports: [
    CommonModule,
    PizzaRoutingModule
  ]
})
export class PizzaModule { }
