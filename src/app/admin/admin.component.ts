import { Component, OnInit } from '@angular/core';
import { AdminService } from './../shared/service/admin.service';
import { ProductService } from '../shared/service/products.service';
import { MenuService } from '../shared/service/menu.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/loja.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  newProduct: Product = {
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    id: 0,
    rating: {
      rate: 0,
      count: 0,
    },
  };
  isMenuVisible: boolean = false;
  isModalVisible: boolean = false;
  selectedCategory: string = '';
  selectedCategoryLabel: string = 'Select Category';
  filteredProducts: any[] = [];
  allProducts: Product[] = [];

  private url = `${environment.apiUrl}/products`;

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private menuService: MenuService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.menuService.obterCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.loadProducts();
    this.loadCategories();

    this.httpClient
      .get<Product[]>('https://fakestoreapi.com/products')
      .subscribe((products) => {
        this.allProducts = products;
      });
  }

  loadProducts(): void {
    this.adminService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.allProducts = products;
      this.filteredProducts = products;
    });
  }

  loadCategories(): void {
    this.menuService.obterCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addProduct(): void {
    // Encontrar o maior ID existente
    const maxId =
      this.products.length > 0
        ? Math.max(...this.products.map((p) => p.id))
        : 0;
    // Atribuir um novo ID incrementado ao novo produto
    this.newProduct.id = maxId + 1;

    fetch(`${environment.apiUrl}/products`, {
      method: 'POST',
      body: JSON.stringify(this.newProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log('Produto adicionado:', response);
        this.products.push(response);
        this.filteredProducts.push(response);
        this.allProducts.push(response);
        this.productService.updateProducts(this.products);
        this.resetNewProduct();
        this.isModalVisible = false;
      });
  }

  removeProduct(productId: number): void {
    fetch(`${environment.apiUrl}/products/${productId}`, {
      method: 'DELETE',
    }).then(() => {
      console.log('Produto deletado:', productId);
      this.products = this.products.filter(
        (product) => product.id !== productId
      );
      this.filteredProducts = this.filteredProducts.filter(
        (product) => product.id !== productId
      );
      this.allProducts = this.allProducts.filter(
        (product) => product.id !== productId
      );
      this.productService.updateProducts(this.products);
    });
  }

  updateProduct(productId: number): void {
    fetch(`${environment.apiUrl}/products/${productId}`, {
      method: 'PUT',
    }).then(() => {
      console.log('Produto adicionado:', productId);
      this.products = this.products.filter(
        (product) => product.id !== productId
      );
      this.filteredProducts = this.filteredProducts.filter(
        (product) => product.id !== productId
      );
      this.productService.updateProducts(this.products);
    });
    console.log('Produto adicionado:', this.updateProduct);
  }

  resetNewProduct(): void {
    this.newProduct = {
      title: '',
      price: 0,
      description: '',
      image: '',
      category: '',
      id: 0,
      rating: {
        rate: 0,
        count: 0,
      },
    };
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedCategoryLabel = category;
    this.filteredProducts = this.allProducts.filter(
      (product) => product.category === category
    );
    this.isMenuVisible = false;
  }
}
