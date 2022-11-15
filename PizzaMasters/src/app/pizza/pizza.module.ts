import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaRoutingModule } from './pizza-routing.module';
import { MenuComponent } from './menu/menu.component';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';


@NgModule({
  declarations: [
    MenuComponent,
    CreatePizzaComponent
  ],
  imports: [
    CommonModule,
    PizzaRoutingModule
  ]
})
export class PizzaModule { }
