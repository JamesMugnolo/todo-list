import { Injectable } from '@angular/core';
import { IUser } from './user-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly url = `${environment.API_BASE_URL}/api/users`;
  constructor(private http: HttpClient) {}

  get(user: IUser): any {
    let headers = new HttpHeaders({ observe: 'response' });
    return this.http.post<IUser>(`${this.url}/sign-in`, user, {
      observe: 'response',
    });
  }
  post(user: IUser): any {
    let headers = new HttpHeaders({ observe: 'response' });
    return this.http.post<IUser>(`${this.url}`, user.username, {
      headers: headers,
    });
  }
}
