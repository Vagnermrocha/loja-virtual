import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrl}/users`;
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`).pipe(
      tap((users) => {
        this.usersSubject.next(users);
        console.log('Usuários:', users);
      })
    );
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.url}/${id}`)
      .pipe(tap((user) => console.log('Usuário:', user)));
  }

  addUsuario(user: any): Observable<any> {
    console.log('Enviando dados do usuário:', user);
    return this.http.post<any>(`${this.url}`, user).pipe(
      tap((newUser) => {
        console.log('Novo usuário:', newUser);
        // Atualizar a lista de usuários com o novo usuário
        const updatedUsers = [...this.usersSubject.value, newUser];
        this.usersSubject.next(updatedUsers);
      })
    );
  }

  updateUsuario(users: any[]) {
    this.usersSubject.next(users);
    return this.http
      .put(this.url, users)
      .pipe(
        tap((updatedUser) => console.log('Usuário atualizado:', updatedUser))
      );
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(
      tap(() => {
        const updatedUsers = this.usersSubject.value.filter(
          (user) => user.id !== id
        );
        this.usersSubject.next(updatedUsers);
        console.log('Usuário deletado:', id);
      })
    );
  }
}
