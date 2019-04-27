import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { UserRegister } from './../../components/shared/models/UserRegister';
import { UserLogin } from './../../components/shared/models/UserLogin';

const baseURL = `${environment.apiURL}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  register(payload: UserRegister): Observable<object> {
    return this.http.post(`${baseURL}/register`, payload);
  }

  login(payload: UserLogin): Observable<object> {
    return this.http.post(`${baseURL}/login`, payload);
  }
}
