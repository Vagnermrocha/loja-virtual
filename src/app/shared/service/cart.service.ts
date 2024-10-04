import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './../loja.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Product[] = [];

  cartUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  addToCart(product: Product) {
    let foundItem = this.items.find((item) => item.id === product.id);
    if (foundItem) {
      foundItem.quantity! += 1;
    } else {
      product.quantity = 1;
      this.items.push(product);
    }
    this.cartUpdated.emit();
  }

  getItems(): Product[] {
    return this.items;
  }

  clearCart(): Product[] {
    this.items = [];
    return this.items;
  }

  removeItem(productId: number): void {
    const index = this.items.findIndex((item) => item.id === productId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  calculateTotal(): number {
    return this.items.reduce(
      (total, current) => total + current.price * (current.quantity || 1),
      0
    );
  }

  finalizePurchase(user: any): Observable<any> {
    const purchase = {
      date: new Date().toLocaleDateString('pt-BR'),
      userId: user.id,
      items: this.items.map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        unitPrice: item.price,
        quantity: item.quantity,
        totalPrice: parseFloat((item.price * (item.quantity || 1)).toFixed(2))
      })),
      total: parseFloat(this.calculateTotal().toFixed(2)),
    };

    return this.http.post('http://localhost:3000/purchases', purchase);
  }

  getPurchases(): Observable<{ [key: string]: number }> {
    return this.http.get<any[]>('http://localhost:3000/purchases').pipe(
      map((purchases: any[]) => {
        console.log('Purchases:', purchases);
        const categoryTotals: { [key: string]: number } = {};
        purchases.forEach((purchase: any) => {
          purchase.items.forEach((item: any) => {
            if (!categoryTotals[item.category]) {
              categoryTotals[item.category] = 0;
            }
            categoryTotals[item.category] += item.totalPrice;
          });
        });
        return categoryTotals;
      })
    );
  }
}

