import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router:Router) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  forgetPassword(email: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/forget-password`, email);
  }
}
