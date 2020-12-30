import { ShippingInfo } from './shipping-info';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';

export class Order {
    customer: string;
    id: string;
    date: string;
    cart: ShoppingCart;
    shippingInfo: ShippingInfo;
}