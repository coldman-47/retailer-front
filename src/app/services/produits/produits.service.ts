import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProduitsService {
  baseUrl = 'http://localhost:8000/shop/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.baseUrl);
  }

  updateProducts(products: any) {
    return this.http.put(this.baseUrl+'/edit', products).toPromise();
  }
}
