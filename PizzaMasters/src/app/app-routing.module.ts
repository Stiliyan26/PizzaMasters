import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { MenuComponent } from "./pizza/menu/menu.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

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
        path: 'pizza',
        loadChildren: () => import('./pizza/pizza.module').then(m => m.PizzaModule) 
    },
    {
        path: 'user',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]

export const AppRoutingModule = RouterModule.forRoot(routes);