import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = ''  

  constructor(private http: HttpClient) { }

  getById(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.url, user);
  }
}
