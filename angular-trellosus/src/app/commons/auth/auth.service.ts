import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersModel } from 'src/app/models/users/users.model';
import { TokenStorageService } from '../token-storage/token-storage.service';
const AUTH_API = 'http://localhost:8000/api';
const ALL_USERS = 'http://localhost:8000/api/users';
const UPDATE_USER = 'http://localhost:8000/api/users-update';
const REGISTER_USER = 'http://localhost:8000/api/register';
const TASK_DETAILS = 'http://localhost:8000/api/tasks-details'
const TASK_UPDATE = 'http://localhost:8000/api/tasks-update'
const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type':  'application/json'
   })
};
const httpOptionsMulti = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    

  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userid?: string;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
    ) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
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
  getCurrentUser(id: any): Observable<any>{
    this.userid = this.tokenStorageService.getUser().id;

    return this.http.get(`${ALL_USERS}/${this.userid}`);
  }
  updateCurrentUser(id: any, formData: FormData): Observable<any>{
    return this.http.post(`${UPDATE_USER}/${id}`, formData);
  }
  getAllTasks(): Observable<any> {
    return this.http.get(AUTH_API + '/tasks');
  }
  getTask(id: any): Observable<any>{
    return this.http.get(`${TASK_DETAILS}/${id}`);
  } 
  updateTask(id: any, formData: FormData): Observable<any>{
    return this.http.put(`${TASK_UPDATE}/${id}`, formData);
  }
}