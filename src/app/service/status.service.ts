import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../model/status";

const API_URL = 'http://localhost:8080/statuses'
@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClien: HttpClient) { }

  findAll(currentId : any): Observable<any> {
    return this.httpClien.get(API_URL+`/?currentId=`+currentId);
  };
  save(status: any): Observable<any>{
    return this.httpClien.post(API_URL , status);
  };
  getById(id: string):Observable<Status>{
    return this.httpClien.get<Status>(API_URL+`/${id}`);
  }
  edit(id:string,status: Status): Observable<Status>{
    return this.httpClien.put<Status>(API_URL+`/${id}`,status);
  }
  delete(id:any): Observable<Status> {
    return this.httpClien.delete<Status>(API_URL+`/${id}`);
  }

  findAllByOwnerId(id : any) : Observable<Status[]>{
    return  this.httpClien.get<Status[]>(API_URL + `/find-all-by-user/${id}`)
  }

  // findAllByStrangerId(id : any) : Observable<Status[]>{
  //   return  this.httpClien.get<Status[]>(API_URL + `/find-all-by-stranger/${id}`)
  // }
  //
  // findAllByFriendId(id : any,currentId : any) : Observable<Status[]>{
  //   return  this.httpClien.get<Status[]>(API_URL + `/find-all-by-friend/${id}?currentId=`+currentId)
  // }




  // delete(id:string,status: Status): Observable<Status>{
  //   return this.httpClien.put<Status>(API_URL+`/${id}`,status);
  // }
}
