import { Injectable } from '@angular/core';
import { HttpClient, HttpParamsOptions, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url : string = "http://localhost:8060/api/home/v1/vehicle"

  private httpOptions = {
    headers : new HttpHeaders({
      'Content-type':'application-json'
    })
  };
  constructor(
    private httpClient:HttpClient,
  ) { }

  public getListVehicleType(){
    return this.httpClient.get<any>(`${this.url}/getListVehicleType`,{headers: this.httpOptions.headers});
  }
  public getListVehicleBrand(){
    return this.httpClient.get<any>(`${this.url}/getListVehicleBrand`,{headers: this.httpOptions.headers});
  }
}
