import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = `${environment.apiUrl}/products`;
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(this.url);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.url}/category/${category}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.url, product);
  }

  removeProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.url}/${productId}`);
  }

  updateProducts(products: any[]) {
    this.productsSubject.next(products);
    return this.http.put(this.url, products);
  }
}
