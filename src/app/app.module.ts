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
import { AdminComponent } from './admin/admin.component';
import { AcessoComponent } from './acesso/acesso.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './usuarios/login/login.component';
import { RoleSelectionComponent } from './acesso/role-selection/role-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminService } from './shared/service/admin.service';
import { CartService } from './shared/service/cart.service';
import { LoginService } from './shared/service/login.service';
import { UserService } from './shared/service/user.service';
import { MaterialModule } from './material/material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { HighchartsComponent } from './highcharts/highcharts.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    HighchartsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    ReactiveFormsModule,
  ],
  providers: [
    MenuService,
    ProductService,
    AdminService,
    CartService,
    LoginService,
    UserService,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {

}
