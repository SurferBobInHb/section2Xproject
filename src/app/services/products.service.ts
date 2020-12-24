import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]>{
    let productsUrl = environment.apiUrl + "angular/products"
    return this.http.get<Product[]>(productsUrl);
  }
}
