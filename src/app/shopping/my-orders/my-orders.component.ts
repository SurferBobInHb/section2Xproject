import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';
import { OrderService } from './../../services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders: Order[];

  subscription: Subscription;

  constructor(private orderService: OrderService, private authService: AuthService) { }
  ngOnInit(): void {
    let username = this.authService.currentUser.username;
    this.subscription = this.orderService.getOrders(username).subscribe(res => {
      console.log(res);
      this.orders = res;
    },
      error => { console.log(error) });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
