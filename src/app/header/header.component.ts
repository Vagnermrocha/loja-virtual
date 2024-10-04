import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CartService } from './../shared/service/cart.service';
import { AuthService } from './../auth/auth.service';
import { Product } from './../shared/loja.interface';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../usuarios/login/login.component';
import { UserService } from '../shared/service/user.service';
import { PurchaseResponse } from './../shared/loja.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  isLoggedIn: boolean = false;
  username: string = '';

  @Output() searchEvent = new EventEmitter<string>();
  emailForm!: FormGroup;

  constructor(
    public cartService: CartService, // Alterado para public
    private authService: AuthService,
    private dialog: MatDialog,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.items = this.cartService.getItems(); // Inicializa os itens do carrinho
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.atualizarUsuarios();
    this.checkLoginStatus();
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.emailForm.get('email')?.valueChanges.subscribe((value: string) => {
      this.novoUsuario.email = value;
    });
  }

  get emailControl(): FormControl {
    return this.emailForm.get('email') as FormControl;
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.username = 'Usuário'; // Substitua pelo nome de usuário real, se disponível
    }
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
        this.resetForm(); // Limpar os campos do formulário
      },
      (error) => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    );
  }

  resetForm() {
    this.novoUsuario = {
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

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = '';
  }

  user = {
    id: '123',
    username: 'johndoe',
    email: 'johndoe@example.com',
    category: 'premium'
  };

  finalizePurchase() {
    this.cartService.finalizePurchase(this.user).subscribe((response: any) => {
      console.log('Compra finalizada com sucesso', response);
      this.cartService.clearCart();
      this.items = this.cartService.getItems(); // Atualiza a lista de itens
    });
  }

}
