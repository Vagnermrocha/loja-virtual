import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private url = `${environment.apiUrl}/products/categories`;

  constructor(private httpClient: HttpClient) {}

  obterCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url);
  }
}
