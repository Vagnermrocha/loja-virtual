import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAdminUser: boolean = false;
  private isRegularUser: boolean = false;

  setAdminUser(isAdmin: boolean): void {
    this.isAdminUser = isAdmin;
  }

  setRegularUser(isRegular: boolean): void {
    this.isRegularUser = isRegular;
  }

  isAdmin(): boolean {
    return this.isAdminUser;
  }

  isRegular(): boolean {
    return this.isRegularUser;
  }
}
