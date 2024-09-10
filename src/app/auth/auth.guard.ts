import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];

    if (expectedRole === 'admin' && this.authService.isAdmin()) {
      return true;
    } else if (expectedRole === 'usuarios' && (this.authService.isRegular() || this.authService.isAdmin())) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

