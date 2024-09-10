import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(): void {
    this.loginService.login(this.username, this.password).subscribe(response => {
      console.log('Token recebido:', response.token);
      // Armazenar o token no localStorage ou sessionStorage
      localStorage.setItem('token', response.token);
      // Redirecionar para a página de home após o login bem-sucedido
      this.router.navigate(['/home']).then(() => {
        window.location.href = '/home';
      });
    }, error => {
      console.error('Erro no login:', error);
      // Exibir mensagem de erro ou tomar outra ação apropriada
    });
  }
}
