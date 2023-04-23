import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/images'
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }
  save(image: any): Observable<any>{
    return this.httpClient.post(API_URL , image);
  }
  findByIdStatus(id: any):Observable<any>{
    return this.httpClient.get(API_URL + `/${id}`);
  }

  updateImage(id : any,image : any) : Observable<any>{
    return this.httpClient.put(API_URL + `/${id}`,image)
  }
  showFullStatus(id: any):Observable<any>{
    return this.httpClient.get(API_URL + `/${id}`);
  }
  deleteImage(id:any): Observable<any> {
    return this.httpClient.delete<any>(API_URL+`/${id}`);
  }

  findAllImageByUser(id:any){
    return this.httpClient.get(API_URL+"/"+ id + "/find-all-image-by-user")
  }

  top5ImageByUser(id:any){
    return this.httpClient.get(API_URL+"/"+ id + "/top5-image-by-user")
  }

}
