import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getMembers(): Observable<Member[]> {
    const url = this.baseUrl + 'users';
    return this.http.get<Member[]>(url);
  }

  getMember(username: string) {
    const url = this.baseUrl + 'users/' + username;
    return this.http.get<Member>(url);
  }
}
