import { RouterModule, Routes } from "@angular/router";
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
        component: CreatePizzaComponent
    },
    {
        path: 'edit',
        component: EditPizzaComponent
    },
    {
        path: 'details',
        component: DetailsPizzaComponent
    },
    {
        path: 'myposts',
        component: MyPostsComponent
    }
]

export const PizzaRoutingModule = RouterModule.forChild(routes);