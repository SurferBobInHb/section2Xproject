import { AuthService } from './../../services/auth.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { OrderService } from './../../services/order.service';
import { ShippingInfo } from './../../models/shipping-info';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  mymodel;

  constructor(private orderService: OrderService, private shoppingCartService: ShoppingCartService, private router: Router, private authService: AuthService) {
    this.mymodel = {name: authService.currentUser.username};
  }

  ngOnInit(): void {
  }

  onSubmit(shippingInfo: ShippingInfo) {
    console.log(shippingInfo);
    let shoppingCart = this.shoppingCartService.shoppingCart;
    this.orderService.submitOrder(shippingInfo, shoppingCart).subscribe(
      res => {
        console.log(res);
        this.shoppingCartService.clear();
        this.router.navigate(['/my-orders', this.authService.currentUser.username]);
      },
      error => {
        console.log(error);
      });
  }

  get username() {
    if (this.authService.currentUser == null)
      return "no one logged in due to current user = null but token is not null";
    return this.authService.currentUser.username;
  }
}
