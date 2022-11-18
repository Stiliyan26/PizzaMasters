import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaRoutingModule } from './pizza-routing.module';
import { MenuComponent } from './menu/menu.component';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { EditPizzaComponent } from './edit-pizza/edit-pizza.component';
import { DetailsPizzaComponent } from './details-pizza/details-pizza.component';
import { RouterModule } from '@angular/router';
import { MyPostsComponent } from './my-posts/my-posts.component';


@NgModule({
  declarations: [
    MenuComponent,
    CreatePizzaComponent,
    EditPizzaComponent,
    DetailsPizzaComponent,
    MyPostsComponent
  ],
  imports: [
    CommonModule,
    PizzaRoutingModule,
  ]
})
export class PizzaModule { }
