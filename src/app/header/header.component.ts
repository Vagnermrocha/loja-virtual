import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from './../shared/service/cart.service';
import { AuthService } from './../auth/auth.service';
import { Product } from './../shared/loja.interface';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../usuarios/login/login.component';
import { UserService } from '../shared/service/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: Product[] = [];
  searchText: string = '';

  isModalVisible = false;
  novoUsuario = {
    email: '',
    username: '',
    password: '',
    name: { firstname: '', lastname: '' },
    address: {
      city: '',
      street: '',
      number: 0,
      zipcode: '',
      geolocation: { lat: '', long: '' },
    },
    phone: '',
  };

  usuarios: any[] = [];

  @Output() searchEvent = new EventEmitter<string>();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.atualizarUsuarios();
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  searchProducts(): void {
    this.searchEvent.emit(this.searchText);
    this.searchText = '';
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
    this.items = this.cartService.getItems();
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  increaseQuantity(item: Product): void {
    item.quantity! += 1;
  }

  decreaseQuantity(item: Product): void {
    if (item.quantity! > 1) {
      item.quantity! -= 1;
    }
  }

  openLogin(): void {
    this.dialog.open(LoginComponent);
  }

  adicionarUsuario() {
    console.log('Dados do novo usuário antes de enviar:', this.novoUsuario);
    this.userService.addUsuario(this.novoUsuario).subscribe(
      (newUser) => {
        console.log('Novo usuário:', newUser);
        this.toggleModal();
        this.atualizarUsuarios();
      },
      (error) => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    );
  }

  atualizarUsuarios() {
    this.userService.getAllUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Erro ao atualizar a lista de usuários:', error);
      }
    );
  }
}
