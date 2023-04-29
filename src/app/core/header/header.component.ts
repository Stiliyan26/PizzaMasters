import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './header-responsive.css']
})
export class HeaderComponent implements OnInit {

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
  }

  logoutHandler() {
    this.authService.handleLogout();
  }
}
