import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component'; // Importando HeaderComponent
import { ProductsComponent } from './products/products.component'; // Importando ProductsComponent
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importando FormsModule
import { MenuService } from './shared/service/menu.service';
import { ProductService } from './shared/service/products.service';
import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin/admin.component';
import { AcessoComponent } from './acesso/acesso.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './usuarios/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RoleSelectionComponent } from './acesso/role-selection/role-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductsComponent,
    AdminComponent,
    AcessoComponent,
    UsuariosComponent,
    LoginComponent,
    RoleSelectionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [MenuService, ProductService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA] // Adicionando NO_ERRORS_SCHEMA aqui
})
export class AppModule { }
