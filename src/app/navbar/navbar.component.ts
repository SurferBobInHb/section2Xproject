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
    console.log("navbar isLoggedIn - " + this._isLoggedIn);
    return this._isLoggedIn;
  }

  get username() {
    return this.authService.currentUser;
  }

  logout() {
    this.authService.logout();
  }
}
