import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:5000/api/';
  currentUser = signal<User | null>(null);

  login(model: any): Observable<any> {
    const url = this.baseUrl + 'account/login';
    return this.http.post<User>(url, model).pipe(
      map( user => {
        if ( user ) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    )
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  
  register(model: any): Observable<any> {
    const url = this.baseUrl + 'account/register';
    return this.http.post<User>(url, model).pipe(
      map( user => {
        if ( user ) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    )
  }
  
  getUsers(): Observable<any> {
    const url = this.baseUrl + 'users';
    return this.http.get(url);
  }

}
