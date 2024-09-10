import { Injectable } from '@angular/core';
import { Product } from './../loja.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = []; // Defina o tipo dos itens como Product[]

  addToCart(product: Product) {
    let foundItem = this.items.find(item => item.id === product.id);
    if (foundItem) {
      foundItem.quantity! += 1; // Supondo que 'quantity' seja uma propriedade de Product
    } else {
      product.quantity = 1; // Inicialize a quantidade
      this.items.push(product);
    }
  }

  getItems(): Product[] {
    return this.items;
  }

  clearCart(): Product[] {
    this.items = [];
    return this.items;
  }

  removeItem(productId: number): void {
    const index = this.items.findIndex(item => item.id === productId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  calculateTotal(): number {
    return this.items.reduce((total, current) => total + (current.price * (current.quantity || 1)), 0);
  }
}
