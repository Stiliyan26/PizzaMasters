import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaRoutingModule } from './pizza-routing.module';
import { MenuComponent } from './menu/menu.component';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { EditPizzaComponent } from './edit-pizza/edit-pizza.component';
import { DetailsPizzaComponent } from './details-pizza/details-pizza.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { FormsModule } from '@angular/forms';
import { PriceValidatorDirective } from '../core/price.directive';
import { StoreModule } from '@ngrx/store';
import { IPizzaState } from './+store';
import { menuReducer } from './+store/reducers';



@NgModule({
  declarations: [
    MenuComponent,
    CreatePizzaComponent,
    EditPizzaComponent,
    DetailsPizzaComponent,
    MyPostsComponent,
    PriceValidatorDirective,
  ],
  imports: [
    CommonModule,
    PizzaRoutingModule,
    FormsModule,
    StoreModule.forFeature<IPizzaState>('pizza', {
      menu: menuReducer
    })
  ]
})
export class PizzaModule { }
