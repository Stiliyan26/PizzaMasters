import { RouterModule, Routes } from "@angular/router";
import { GuestGuard } from "../core/guard/guest.guard";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: 'login',
        canActivate: [GuestGuard],
        component: LoginComponent
    },
    {
        path: 'register',
        canActivate: [GuestGuard],
        component: RegisterComponent
    }
]

export  const AuthRoutingModule = RouterModule.forChild(routes);