import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { MyOrdersComponent } from 'src/app/shopping/my-orders/my-orders.component';

@Component({
  selector: 'manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {

  orders: Order[];

  subscription: Subscription;

  constructor(private orderService: OrderService) { }
  ngOnInit(): void {
    this.subscription = this.orderService.getOrders().subscribe(res => {
      console.log(res);
      this.orders = res;
    },
      error => { console.log(error) });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
