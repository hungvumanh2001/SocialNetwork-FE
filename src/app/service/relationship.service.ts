import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Relationship} from "../model/relationship";
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  constructor(private httpClient:HttpClient) { }

  addFiend(relationship:Relationship):Observable<Relationship>{
    return this.httpClient.post<Relationship>(API_URL+"relationships",relationship);
  }

  getRelationship(id1:any,id2:any):Observable<Relationship> {
    return this.httpClient.get<Relationship>(API_URL + "relationships/search-relationship?id1=" + id1 + "&id2=" + id2);
  }

  deleteRelationship(id:any){
    return this.httpClient.delete(API_URL+"relationships/"+id)
  }

  friendConfirmation(id:any){
    return this.httpClient.put(API_URL + "relationships/" + id,null);
  }

  findAllFriendListByUserId(id:any){
    return this.httpClient.get(API_URL +"relationships/" + id+ "/find-all-friend-by-userId/")
  }

  findMutualFriend(currentId:any,id:any){
    return this.httpClient.get(API_URL+"relationships/find-mutual-friends?currentId=" + currentId +"&id=" + id)
  }
}
