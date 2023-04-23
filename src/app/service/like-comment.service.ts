import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
const API_URL = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {

  constructor(private httpClient: HttpClient) { }

  likeComment(idComment:any,isUser:any){
    return this.httpClient.post(API_URL + "like-comments?idComment=" +idComment + "&idUser=" + isUser,null)
  }

  check(idComment:any,isUser:any){
    return this.httpClient.get(API_URL + "like-comments/check?idComment=" +idComment + "&idUser=" + isUser)
  }
}
