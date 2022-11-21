import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { PageModule } from './pages/page.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { IRootState } from './+store';
import { currentUserReducer } from './+store/reducers';
import { RouterModule } from '@angular/router';
import { UserService } from './core/user.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    PageModule,
    HttpClientModule,
    StoreModule.forRoot<IRootState>({
      currentUser: currentUserReducer
    }, {})
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => {
        return () => authService.authenticate()
      },
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [
    HeaderComponent,
    AppComponent,
    FooterComponent
  ]
})
export class AppModule { }
