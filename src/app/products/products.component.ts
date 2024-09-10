import { Component, Input, OnChanges } from '@angular/core';
import { Product } from './../shared/loja.interface';
import { CartService } from './../shared/service/cart.service';
import { ProductService } from './../shared/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnChanges {
  @Input() products: Product[] = [];
  @Input() category: string = '';

  constructor(private cartService: CartService, private productService: ProductService) {} // Injetar o serviço de produtos

  ngOnChanges(): void {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Seu produto foi adicionado ao carrinho!');
  }

  addProduct(): void {
    const newProduct: Product = {
      id: 0,
      title: 'test product',
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: this.category,
      rating: {
        rate: 0,
        count: 0
      },
      quantity: 1
    };

    this.productService.addProduct(newProduct).subscribe((response: Product) => {
      console.log('Produto adicionado:', response);
      this.products.push(response);
      this.productService.updateProducts(this.products);
    });
  }

  removeProduct(productId: number): void {
    this.productService.removeProduct(productId).subscribe(() => {
      this.products = this.products.filter(product => product.id !== productId);
    });
  }
}
