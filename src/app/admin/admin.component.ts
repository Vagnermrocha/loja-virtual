import { Component, OnInit } from '@angular/core';
import { AdminService } from './../shared/service/admin.service';
import { ProductService } from '../shared/service/products.service';
import { MenuService } from '../shared/service/menu.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  newProduct = {
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  };
  isMenuVisible: boolean = false;
  isModalVisible: boolean = false; // Adicione esta linha
  selectedCategory: string = '';
  selectedCategoryLabel: string = 'Categorias';
  filteredProducts: any[] = [];

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.adminService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products; // Inicialmente, todos os produtos são exibidos
    });
  }

  loadCategories(): void {
    this.menuService.obterCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addProduct(): void {
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
        this.productService.updateProducts(this.products); // Atualize os produtos
        this.resetNewProduct();
        this.isModalVisible = false; // Fecha o modal após adicionar o produto
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
      this.productService.updateProducts(this.products); // Atualize os produtos
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
    };
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible; // Alterna a visibilidade do modal
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedCategoryLabel = category;
    this.filteredProducts = this.products.filter(
      (product) => product.category === category
    );
    this.isMenuVisible = false;
  }
}
