import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { VehicleService } from "src/app/service/vehicle.service";
import { InfractionService } from "src/app/service/infraction.service";
import { InternmentService } from "src/app/service/internment.service";

@Component({
  selector: 'app-new-internment',
  templateUrl: './new-internment.component.html',
  styleUrls: ['./new-internment.component.scss']
})
export class NewInternmentComponent implements OnInit {

  formInternment!: FormGroup;
  vehicleType: any = '';
  vehicleBrand: any = '';
  listInfraction: any = '';
  vehicleTypeSelect: Number = 0 ;
  vehicleBrandSelect: Number = 0 ;
  vehiclePlateSelect: Number = 0 ;
  vehicleColorSelect: Number = 0 ;

  @Output() backInternment = new EventEmitter();

  constructor(
    private formBuilder:FormBuilder,
    private vehicleService:VehicleService,
    private infractionService:InfractionService,
    private internmentService:InternmentService,
  ){
    this.builderInternment();
  }

  ngOnInit(): void {
      this.vehicleService.getListVehicleType().subscribe(data=>{
        this.vehicleType = data;
      })
      this.vehicleService.getListVehicleBrand().subscribe(data=>{
        this.vehicleBrand = data;
      })
      this.infractionService.getListInfraction().subscribe(data=>{
        this.listInfraction = data;
      })
      this.formInternment.valueChanges.subscribe(res=>{
        console.log(res);
        console.log(this.formInternment.get("vehicle.type"));
      })
      this.formInternment.get('admission_ticket.vehicle.type')?.disable();
      this.formInternment.get('admission_ticket.vehicle.brand')?.disable();
      this.formInternment.get('admission_ticket.vehicle.plate')?.disable();
      this.formInternment.get('admission_ticket.vehicle.color')?.disable();
      this.formInternment.get('infraction')?.disable();


  }

  back(){
    this.backInternment.emit(false);
  }

  save(){
    if (this.formInternment.valid) {
      this.formInternment.get('infraction')?.enable();
      this.formInternment.get('admission_ticket.vehicle.type')?.enable();
      this.formInternment.get('admission_ticket.vehicle.brand')?.enable();
      this.formInternment.get('admission_ticket.vehicle.plate')?.enable();
      this.formInternment.get('admission_ticket.vehicle.color')?.enable();
      this.internmentService.saveInfraction(this.formInternment.value).subscribe( data => {
        console.log(data);
        this.backInternment.emit(false);
      })
      console.log(this.formInternment.value);
    }

  }

  typeChange(value: any) {
    this.formInternment.get('admission_ticket.vehicle.type')?.setValue(value);
  }
  brandChange(value: any) {
    this.formInternment.get('admission_ticket.vehicle.brand')?.setValue(value);
  }
  plateChange(value: any) {
    this.formInternment.get('admission_ticket.vehicle.plate')?.setValue(value.target.value);
  }
  colorChange(value: any) {
    this.formInternment.get('admission_ticket.vehicle.color')?.setValue(value.target.value);
  }

  infractionChange(value: any){
    this.formInternment.get('infraction')?.setValue(value);
  }

  builderInternment(){
    this.formInternment = this.formBuilder.group({
      vehicle: this.formBuilder.group({
        type: [0,Validators.required],
        brand: [0,Validators.required],
        plate: [''],
        color: ['',Validators.required]
      }),
      admission_ticket: this.formBuilder.group({
        owner : this.formBuilder.group({
          name : ['',Validators.required],
          lastname : ['',Validators.required],
          address : [''],
          phone : [''],
        }),
        remitter : this.formBuilder.group({
          authority : ['',Validators.required],
          ballot : ['',Validators.required],
          infraction : [0],
        }),
        vehicle: this.formBuilder.group({
          type: [0,Validators.required],
          brand: [0,Validators.required],
          plate: [''],
          color: ['',Validators.required]
        }),
        number : ['',Validators.required],
        observations : [''],
        in_charge : ['',Validators.required],
      }),
      freedom_number : [''],
      infraction : [0]
    })
  }

}
