import { Component, OnInit } from '@angular/core';
import { MenuService } from './../shared/service/menu.service';
import { ProductService } from './../shared/service/products.service';
import { LoginService } from '../shared/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  isMenuVisible = false;
  categories: string[] = [];
  selectedCategory: string = '';
  selectedCategoryLabel: string = 'Categorias'; // Adicione esta linha
  allProducts: any[] = []; // Todos os produtos
  filteredProducts: any[] = []; // Produtos filtrados por categoria ou pesquisa

  constructor(
    private menuService: MenuService,
    private productService: ProductService,
    private loginService: LoginService,
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
      // Aqui você pode decodificar o token para obter o nome de usuário, se necessário
      this.username = 'Usuário'; // Substitua pelo nome de usuário real, se disponível
    }

    this.menuService.obterCategories().subscribe((data: string[]) => {
      this.categories = data;
    });

    this.productService.products$.subscribe((products) => {
      this.allProducts = products;
      this.filteredProducts = products;
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
    this.selectedCategory = category;
    this.selectedCategoryLabel = category; // Atualiza o rótulo da categoria selecionada
    this.filteredProducts = this.allProducts.filter(
      (product) => product.category === category
    );
    this.isMenuVisible = false; // Fecha o menu após a seleção
  }

  searchProducts(searchText: string): void {
    if (searchText) {
      this.filteredProducts = this.allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase()) ||
          product.description.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredProducts = this.allProducts; // Se o campo de pesquisa estiver vazio, exibe todos os produtos
    }
  }
}
