import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersModel } from 'src/app/models/users/users.model';
const AUTH_API = 'http://localhost:8000/api';
const ALL_USERS = 'http://localhost:8000/api/users';
const ONLY_USER = 'http://localhost:8000/api/user';
const REGISTER_USER = 'http://localhost:8000/api/register';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type':  'application/json'
   })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/signin', {
      email,
      password
    }, httpOptions);
  }
  register(data: any): Observable<any> {
    const json = JSON.stringify(data);
    console.log(json);
    console.log(data);
    return this.http.post(AUTH_API+'/register' , data, httpOptions);
  }
  getAllUsers(): Observable<UsersModel[]> {
    return this.http.get<UsersModel[]>(ALL_USERS);
  }
  getUser(id: any): Observable<any>{
    return this.http.get(`${ALL_USERS}/${id}`);
  }
}