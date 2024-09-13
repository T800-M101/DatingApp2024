import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of, tap } from 'rxjs';
import { Member } from '../_models/member';
import { Photo } from '../_models/Photo';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);

  getMembers(): any {
    const url = this.baseUrl + 'users';
    return this.http.get<Member[]>(url).subscribe({
      next: members => this.members.set(members)
    });
  }

  getMember(username: string): Observable<any> {
    const member = this.members().find(member => member.userName === username);
    if (member !== undefined) return of(member);

    const url = this.baseUrl + 'users/' + username;
    return this.http.get<Member>(url);
  }

  /* Update members returns an Observable to be used in a component. It also tap (which gives a side effect)
    and updates the Signal this.members to persists data using this member service, in this way the 
    performance is improved.
  */
  updateMember(member: Member): Observable<any> {
    const url = this.baseUrl + 'users';
    return this.http.put<any>(url, member).pipe(
      tap(() => {
        this.members.update( members => members.map(m => m.userName === member.userName ? member : m ));
      })
    );
  }

  setMainPhoto(photo: Photo): Observable<any> {
    const url = this.baseUrl + 'users/set-main-photo/' + photo.id;
    return this.http.put(url, {}).pipe(
      tap(() => {
        this.members.update(members => members.map(m => {
          if(m.photos.includes(photo)) {
            m.photoUrl = photo.url; 
          }
          return m;
        }));
      })
    )
  }

  deletePhoto(photo: Photo): Observable<any> {
    const url = this.baseUrl + 'users/delete-photo/' + photo.id;
    return this.http.delete(url).pipe(
      tap(() => {
        this.members.update(members => members.map(m => {
          if (m.photos.includes(photo)) {
            m.photos = m.photos.filter(p => p.id !== photo.id);
          }
          return m;
        }))
      })
    )
  }
}