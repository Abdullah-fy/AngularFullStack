import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {  map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router:Router) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user).pipe(
      tap((response: any) => {
        console.log('Signup successful:', response);
        // Optionally, you can store the token or user data here
      }),
      catchError((error) => {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
        return throwError(() => new Error('Signup failed. Please try again.'));
      })
    );  
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        
        console.log('Login successful:', response);
        alert('login sucessfully')
      }),
      catchError((error) => {
        console.error('Login error:', error);
        alert("wrong mail or password");
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
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
      tap((response: any) => {
        console.log('Reset link sent successfully:', response);
      }),
      catchError((error) => {
        console.error('Error sending reset link:', error);
        alert('failed send reset');
        return throwError(() => new Error('Failed to send reset link. Please try again.'));
      })
    );
  }


  resetPassword(token: string, password: string, passwordConfirm: string): Observable<any> {
    console.log('Sending reset password request to backend:', `${this.baseUrl}/resetPassword/${token}`);
    return this.http.patch(`${this.baseUrl}/resetPassword/${token}`, { password, passwordConfirm }).pipe(
      tap((response: any) => {
        console.log('Password reset successful:', response);
      }),
      catchError((error) => {
        console.error('Error resetting password:', error);
        return throwError(() => new Error('Failed to reset password. Please try again.'));
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
}
