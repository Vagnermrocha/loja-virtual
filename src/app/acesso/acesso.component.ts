import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RoleSelectionComponent } from './role-selection/role-selection.component';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.scss']
})
export class AcessoComponent implements OnInit {
  password: string = '';
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    console.log('AcessoComponent carregado');
  }

  checkPassword() {
    const correctPassword = 'boneco';
    if (this.password === correctPassword) {
      this.errorMessage = '';
      this.isAdmin = true;
      this.authService.setAdminUser(true);
      console.log('Senha correta. Abrindo modal de seleção de papel.');
      this.dialog.open(RoleSelectionComponent);
    } else {
      this.errorMessage = 'Senha incorreta. Tente novamente.';
      this.isAdmin = false;
      this.authService.setAdminUser(false);
      console.log('Senha incorreta');
    }
  }
}
