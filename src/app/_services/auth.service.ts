import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../_models/user';

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
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  // forgetPassword(email: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/forgetPassword`, email);
  // }

  forgetPassword(email: string): Observable<any> {
    console.log('Sending reset link request to backend:', `${this.baseUrl}/forgetPassword`);
    return this.http.post(`${this.baseUrl}/forgetPassword`, { email }).pipe(
      catchError((error) => {
        console.error('Error sending reset link:', error);
        return throwError(() => error);
      })
    );
  }


  resetPassword(token: string, password: string, passwordConfirm: string): Observable<any> {
    console.log('Sending reset password request to backend:', `${this.baseUrl}/resetPassword/${token}`);
    return this.http.patch(`${this.baseUrl}/resetPassword/${token}`, { password, passwordConfirm }).pipe(
      catchError((error) => {
        console.error('Error resetting password:', error);
        return throwError(() => error);
      })
    );
  }

  // resetPassword(data: { token: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/resetPassword`, data).pipe(
  //     catchError((error) => {
  //       console.error('Error resetting password:', error);
  //       return throwError(() => error);
  //     })
  //   );
  // }

  private currentUser: User | null = null;

  setCurrentUser(user: User) : void {
    this.currentUser = user;
  }

  getCurrentUserId(): string {
    return this.currentUser?._id || '';
  }
}
