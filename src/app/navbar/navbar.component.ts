import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCartComponent } from './../shopping/shopping-cart/shopping-cart.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { MyUser } from '../ana/login/my-user';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  faCoffee = faCoffee;

  _isLoggedIn = false;

  shoppingCart: ShoppingCart;

  subscription: Subscription;

  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingCartService.shoppingCartChanged.subscribe(a => {console.log("navbar cart changed " + a); this.shoppingCart = a;});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get isLoggedIn() {
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

  getMyOrdersUrl() {
    return "/my-orders/" + this.username;
  }

  isAdminUser() : boolean {
    
    let user: MyUser = this.authService.currentUser;
    let ans = user.role === "admin";
    if (ans) return true;
    
    if (this.authService.currentUser == null)
      return false;
    return this.authService.currentUser.role === 'admin';
  }

  get shoppingCartCount() {
    return this.shoppingCartService.getTotalItems();
  }

}
