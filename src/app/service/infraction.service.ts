import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InfractionService {

  private url : string = "http://localhost:8060/api/home/v1/infraction"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type':'application-json'
    })
  };

  constructor(
    private httpClient:HttpClient,
  ) { }

  public getListInfraction(){
    return this.httpClient.get<any>(`${this.url}/getListInfraction`,{headers:this.httpOptions.headers});
  }
}
