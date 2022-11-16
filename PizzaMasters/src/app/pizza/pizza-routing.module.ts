import { RouterModule, Routes } from "@angular/router";
import { CreatePizzaComponent } from "./create-pizza/create-pizza.component";
import { EditPizzaComponent } from "./edit-pizza/edit-pizza.component";
import { MenuComponent } from "./menu/menu.component";

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
    }
]

export const PizzaRoutingModule = RouterModule.forChild(routes);