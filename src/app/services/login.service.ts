// login.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = '/api/moradores'; // seu endpoint base

  constructor(private httpClient: HttpClient) { }

  login(email: string, senha: string) {
    return this.httpClient.post<{ message?: string }>(`${this.baseUrl}/auth`, { email, senha }).pipe(
      tap(() => {
        sessionStorage.setItem("auth-token", "fake-token"); // substitua futuramente por JWT
        sessionStorage.setItem("email", email);
      })
    );
  }

  signUp(data: any) {
    return this.httpClient.post(`${this.baseUrl}`, data);
  }
}
