import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  async getProductsNow() : Promise<Product[]>{
    let productsUrl = environment.apiUrl + "angular/products";
    const response = await this.http.get<Product[]>(productsUrl).toPromise();
    return response;
  }

  getProduct(id: number) : Observable<Product> {
    let productUrl = environment.apiUrl + "angular/product/" + id;
    return this.http.get<Product>(productUrl);
  }

  editProduct(id: number, product: Product) : Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let productUrl = environment.apiUrl + "angular/product/edit/" + id;
    return this.http.put(productUrl, product, {headers});
  } 

  createProduct(product: Product) : Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    let productUrl = environment.apiUrl + "angular/product/create";
    return this.http.post(productUrl, product, {headers});
  } 

  deleteProduct(id: number) : Observable<any> {
    let productUrl = environment.apiUrl + "angular/product/delete/" + id;
    return this.http.delete(productUrl);
  }

  getCategories() : Observable<string[]>{
    let productsUrl = environment.apiUrl + "angular/product/categories"
    return this.http.get<string[]>(productsUrl);
  }

}
