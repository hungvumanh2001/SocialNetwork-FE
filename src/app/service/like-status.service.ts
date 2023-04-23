import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class LikeStatusService {

  constructor(private httpClient: HttpClient) { }

  likeStatus(idStatus:any,isUser:any){
    return this.httpClient.post(API_URL + "like-statuses?idStatus=" +idStatus + "&idUser=" + isUser,null)
  }

  check(idStatus:any,isUser:any){
    return this.httpClient.get(API_URL + "like-statuses/check?idStatus=" +idStatus + "&idUser=" + isUser)
  }
}
