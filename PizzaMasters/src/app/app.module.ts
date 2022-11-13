import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [
    HeaderComponent,
    AppComponent,
    FooterComponent
  ]
})
export class AppModule { }
