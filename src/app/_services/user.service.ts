import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isValidForm = false;

  validateForm(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) : void {
    const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    this.isValidForm = (
      firstName.trim() !== '' && nameRegex.test(firstName) &&
      lastName.trim() !== '' && nameRegex.test(lastName) &&
      email.trim() !== '' && emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === confirmPassword
    );
  }

  

  private url = 'http://localhost:3000/users/'  

  constructor(private http: HttpClient) { }

  getById(email:any): Observable<User> {
    return this.http.get<User>(this.url+email);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.url, user);
  }
}
