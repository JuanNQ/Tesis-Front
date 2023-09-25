import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  private apiUrl: string = 'https://api.platerecognizer.com/v1/plate-reader/';
  private token: string = 'Token e45904181498dbd892daba1b184b3e93b7691961';

  constructor(private http: HttpClient) { }

  recognizePlate(file: any) {
    const formData: FormData = new FormData();
    formData.append('upload', file.imageAsDataUrl);
    formData.append('regions', 'pe'); // Change to your country

    const headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.post(this.apiUrl, formData, { headers: headers });
  }
}
