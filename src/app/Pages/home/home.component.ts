import { Component } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import { PlateService } from "src/app/service/plate.service";
import { InternmentService } from "src/app/service/internment.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  numericSidebar : number = 0;
  plate: String = '';
  existPlate: boolean = false;
  internment : any = {};
  validInternment : boolean = false;
  validFreedom  : boolean = false;
  public webcamImage: WebcamImage | null = null;

  constructor(
    private plateService:PlateService,
    private internmentService:InternmentService,
  ){}

  statusSidebar(value: number){
    this.numericSidebar = value;
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.onFileSelected();
  }

  onFileSelected() {
    this.plateService.recognizePlate(this.webcamImage).subscribe((data: any) =>{
      if(data.results[0] != undefined){
        console.log(data.results[0].plate);
        this.plate = data.results[0].plate;
        this.existPlate = true;
        this.existPlateVehicle();
      } else{
        this.plate = "Placa no detectada. Por favor tome nuevamente la foto";
        this.validInternment = false;
        this.existPlate = false;
      }
    });
  }

  existPlateVehicle(){
    this.internmentService.getInternmentByPlate(this.plate).subscribe(data=>{
      if(data != null) {
        this.internment = data;
        this.validInternment = true;
        if(this.internment.freedom_number != "") this.validFreedom = true;
        console.log(data);
      }
    })
  }

}
