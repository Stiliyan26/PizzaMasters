import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaRoutingModule } from './pizza-routing.module';
import { MenuComponent } from './menu/menu.component';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { EditPizzaComponent } from './edit-pizza/edit-pizza.component';
import { DetailsPizzaComponent } from './details-pizza/details-pizza.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MenuComponent,
    CreatePizzaComponent,
    EditPizzaComponent,
    DetailsPizzaComponent
  ],
  imports: [
    CommonModule,
    PizzaRoutingModule,
  ]
})
export class PizzaModule { }
