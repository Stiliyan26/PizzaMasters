import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { MenuComponent } from "./pages/menu/menu.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'menu',
        component: MenuComponent
    },
]

export const AppRoutingModule = RouterModule.forRoot(routes);