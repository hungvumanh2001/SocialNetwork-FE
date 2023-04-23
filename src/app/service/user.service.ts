import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../model/user";
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUserProfile(id: number): Observable<User> {
    return this.http.get<User>(API_URL + `users/${id}`);
  }

  updateUserProfile(id: number, user: User): Observable<User> {
    return this.http.put<User>(API_URL + `users/${id}`, user);
  }

  updatePassword(id : number, user: User,currentPassword : string): Observable<User> {
    return this.http.put<User>(API_URL + `users/change-password/${id}?currentPassword=`+ currentPassword, user);
  }

  updateAvatar(id : any,user : User) : Observable<User>{
    return this.http.put<User>(API_URL + `users/change-avatar/${id}`,user)
  }


}
