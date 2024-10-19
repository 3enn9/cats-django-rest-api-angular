import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = environment.apiUrl

  constructor(private http: HttpClient) { }

  createUser(Email: string, Username: string, Password: string): Observable<any>{
    const body = {email: Email, username: Username, password: Password};
    return this.http.post(this.baseurl + 'api/v1/auth/users/', body)
  }
  getToken(Username: string, Password: string): Observable<any>{
    const body = {username: Username, password: Password};
    return this.http.post(this.baseurl + 'api/v1/auth-token/token/login/', body)
  }

  getUserWithToken(Token: string): Observable<any>{
    const body = {}
    return this.http.post(this.baseurl + 'api/v1/user/user/by/token/', body,
      {headers: {'Content-Type': 'application/json', Authorization: 'Token ' + Token}}
    )

  }

}

