import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guard/auth.guard";
import { CartComponent } from "./cart/cart.component";
import { CreatePizzaComponent } from "./create-pizza/create-pizza.component";
import { DetailsPizzaComponent } from "./details-pizza/details-pizza.component";
import { EditPizzaComponent } from "./edit-pizza/edit-pizza.component";
import { MenuComponent } from "./menu/menu.component";
import { MyPostsComponent } from "./my-posts/my-posts.component";

const routes: Routes = [
    {
        path: 'menu',
        component: MenuComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: CreatePizzaComponent
    },
    {
        path: 'edit/:pizzaId',
        canActivate: [AuthGuard],
        component: EditPizzaComponent
    },
    {
        path: 'menu/:pizzaId',
        component: DetailsPizzaComponent
    },
    {
        path: 'myposts',
        canActivate: [AuthGuard],
        component: MyPostsComponent
    },
    {
        path: 'cart',
        canActivate: [AuthGuard],
        component: CartComponent
    }
]

export const PizzaRoutingModule = RouterModule.forChild(routes);