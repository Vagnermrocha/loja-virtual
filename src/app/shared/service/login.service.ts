import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });

    return this.http.post<any>(this.url, body, { headers }).pipe(
      tap((response) => {
        console.log('Login bem-sucedido:', response);
        localStorage.setItem('token', response.token);
        if (response.role === 'admin') {
          this.authService.setAdminUser(true);
        } else {
          this.authService.setRegularUser(true);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.setAdminUser(false);
    this.authService.setRegularUser(false);
    console.log('Logout bem-sucedido');
  }
}
