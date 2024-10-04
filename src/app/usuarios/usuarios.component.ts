import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../shared/loja.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  @Input() users: any[] = [];
  isAdmin: boolean = true; // Supondo que você tenha uma maneira de definir isso com base no usuário logado

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe((users) => {
      this.users = users;
      console.log('Dados dos usuários recebidos:', users);
    });
    this.obterUsuarios();
  }

  obterUsuarios(): void {
    this.userService.getAllUsuarios().subscribe((users) => {
      this.users = users;
      console.log('Lista de usuários atualizada:', users);
    });
  }

  adicionarUsuario(): void {
    const novoUsuario: Usuario = {
      email: 'novo.email@gmail.com',
      username: 'novousuario',
      password: 'senha123',
      name: { firstname: 'Novo', lastname: 'Usuário' },
      address: {
        city: 'Cidade',
        street: 'Rua',
        number: 123,
        zipcode: '12345-678',
        geolocation: { lat: '-23.5505', long: '-46.6333' },
      },
      phone: '123-456-7890',
    };

    // Gerar novo ID baseado no último ID existente
    const novoId =
      this.users.length > 0
        ? Math.max(...this.users.map((user) => user.id || 0)) + 1
        : 1;
    novoUsuario.id = novoId;

    this.userService.addUsuario(novoUsuario).subscribe((response: Usuario) => {
      console.log('Usuário adicionado:', response);
      this.users.push(response);
      this.userService.updateUsuario(this.users);
    });
  }

  deletarUsuario(userId: number): void {
    this.http.delete(`${environment.apiUrl}/users/${userId}`).subscribe(
      (response: any) => {
        console.log('Usuário deletado com sucesso', response);

        this.users = this.users.filter((user) => user.id !== userId);
        this.userService.updateUsuario(this.users);
      },
      (error: any) => {
        console.error('Erro ao deletar usuário', error);
      }
    );
  }
}
