import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../model/status";

const API_URL = 'http://localhost:8080/comments'
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<any> {
    return this.httpClient.get(API_URL);
  };
  save(comment: any): Observable<any>{
    return this.httpClient.post(API_URL , comment);
  };
  getById(id: any):Observable<Comment>{
    return this.httpClient.get<Comment>(API_URL+`/${id}`);
  }
  edit(id:any,comment: Comment): Observable<Comment>{
    return this.httpClient.put<Comment>(API_URL+`/${id}`,comment);
  }
  delete(id:any): Observable<any> {
    return this.httpClient.delete<any>(API_URL+`/${id}`);
  }

  getAllByStatus(id:any): Observable<any> {
    return this.httpClient.get<any>(API_URL+`/find-all-by-status?statusId=${id}`);
  }

}
