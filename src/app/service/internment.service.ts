import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InternmentService {

  private url : string = 'http://localhost:8060/api/home/v1/internment'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(
    private httpClient:HttpClient
  ) { }

  public getListInternment(size: number, page:number, search: string){
    let params = new HttpParams();
    params = params.set('size',size);
    params = params.set('page',page);
    params = params.set('search',search);

    return this.httpClient.get<any>(`${this.url}/getListPageInternment`,{headers:this.httpOptions.headers, params: params});
  }

  public deleteInternment(id: number): Observable<any>{
    return this.httpClient.delete(`${this.url}/deleteInternment/${id}`,{headers:this.httpOptions.headers});
  }

  public getInternment(id: number){
    return this.httpClient.get<any>(`${this.url}/getInternment/${id}`,{headers:this.httpOptions.headers});
  }

  public saveInfraction(body: any){
    return this.httpClient.post<any>(`${this.url}/saveInternment`,body, {headers:this.httpOptions.headers});
  }

}
