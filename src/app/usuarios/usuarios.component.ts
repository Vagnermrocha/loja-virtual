import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  // users: any[] = [];
  @Input() users: any[] = [];


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe(users => {
      this.users = users;
      console.log('Dados dos usuários recebidos:', users);
    });
    this.obterUsuarios();
  }

  obterUsuarios(): void {
    this.userService.getAllUsuarios().subscribe(users => {
      this.users = users;
      console.log('Lista de usuários atualizada:', users);
    });
  }


  adicionarUsuario(): void {
    const novoUsuario = {
      email: 'novo.email@gmail.com',
      username: 'novousuario',
      password: 'senha123',
      name: { firstname: 'Novo', lastname: 'Usuário' },
      address: {
        city: 'Cidade',
        street: 'Rua',
        number: 123,
        zipcode: '12345-678',
        geolocation: { lat: '-23.5505', long: '-46.6333' }
      },
      phone: '123-456-7890'
    };

  //   this.userService.addUsuario(novoUsuario).subscribe(
  //     (newUser) => {
  //       console.log('Novo usuário:', newUser);
  //       this.obterUsuarios(); // Atualiza a lista de usuários após adicionar um novo usuário
  //     },
  //     (error) => {
  //       console.error('Erro ao cadastrar usuário:', error);
  //     }
  //   );
  // }
  this.userService.addUsuario(novoUsuario).subscribe((response: any) => {
    console.log('Usuário adicionado:', response);
    this.users.push(response);
    this.userService.updateUsuario(this.users);
  });
}




  deletarUsuario(id: number): void {
    this.userService.deleteUsuario(id).subscribe(() => {
      console.log('Usuário deletado:', id);
    });
  }
}
