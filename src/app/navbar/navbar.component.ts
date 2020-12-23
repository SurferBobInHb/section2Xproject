import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faCoffee = faCoffee;

  _isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  get isLoggedIn() {
    // this._isLoggedIn = true;
    this._isLoggedIn = this.authService.isLoggedIn();
    return this._isLoggedIn;
  }

  get username() {
    if (this.authService.currentUser == null)
      return "no one logged in due to current user = null but token is not null";
    return this.authService.currentUser.username;
  }

  logout() {
    this.authService.logout();
  }

  isAdminUser() : boolean {
    if (this.authService.currentUser == null)
      return false;
    return this.authService.currentUser.role === 'admin';
  }
}
