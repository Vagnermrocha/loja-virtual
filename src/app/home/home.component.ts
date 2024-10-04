import { Component, OnInit } from '@angular/core';
import { MenuService } from './../shared/service/menu.service';
import { ProductService } from './../shared/service/products.service';
import { LoginService } from '../shared/service/login.service';
import { CartService } from './../shared/service/cart.service'; // Importe o CartService
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shouldLoadHighcharts = false;
  isLoggedIn: boolean = false;
  username: string = '';
  isMenuVisible = false;
  categories: string[] = [];
  selectedCategory: string = '';
  selectedCategoryLabel: string = 'Categorias';
  allProducts: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private menuService: MenuService,
    private productService: ProductService,
    private loginService: LoginService,
    private cartService: CartService, // Adicione o CartService ao construtor
    private router: Router
  ) {
    this.productService.getAllProducts().subscribe((products) => {
      this.allProducts = products;
      this.filteredProducts = products;
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.username = 'Usuário';
    }

    this.menuService.obterCategories().subscribe((data: string[]) => {
      this.categories = data;
    });

    this.productService.products$.subscribe((products) => {
      this.allProducts = products;
      this.filteredProducts = products;
    });

    // Ouça o evento cartUpdated
    this.cartService.cartUpdated.subscribe(() => {
      this.reloadProducts();
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/home']).then(() => {
      window.location.href = '/home';
    });
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  selectCategory(category: string): void {
    this.selectedCategoryLabel = category;
    this.filteredProducts = this.allProducts.filter(
      (product) => product.category === category
    );
    this.isMenuVisible = false;
  }

  searchProducts(searchText: string): void {
    if (searchText) {
      this.filteredProducts = this.allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase()) ||
          product.description.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredProducts = this.allProducts;
    }
  }

  reloadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.allProducts = products;
      this.filteredProducts = products;
    });
  }
}



