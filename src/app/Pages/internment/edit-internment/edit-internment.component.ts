import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InternmentService } from "src/app/service/internment.service";
import { VehicleService } from "src/app/service/vehicle.service";
import { InfractionService } from "src/app/service/infraction.service";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-edit-internment',
  templateUrl: './edit-internment.component.html',
  styleUrls: ['./edit-internment.component.scss']
})
export class EditInternmentComponent implements OnInit{
  @Output() backInternment = new EventEmitter();
  @Input() idInternment : number = 0;
  formInternment!: FormGroup;

  vehicleType: any = '';
  vehicleBrand: any = '';
  listInfraction: any = '';
  objectInternment : any = {};
  internmentOld: any = {};
  internmentNew: any = {};

  constructor(
    private internmentService:InternmentService,
    private vehicleService:VehicleService,
    private infractionService:InfractionService,
    private formBuilder:FormBuilder,
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
    if (this.idInternment!=0) {
      this.internmentService.getInternment(this.idInternment).subscribe(data=>{
        console.log(data);
        this.objectInternment = data;
        if(this.objectInternment.vehicleEntity.vehicleTypeEntity != null) this.formInternment.get('vehicle.type')?.setValue( this.objectInternment.vehicleEntity.vehicleTypeEntity.id);
        if(this.objectInternment.vehicleEntity.vehicleBrandEntity != null) this.formInternment.get('vehicle.brand')?.setValue( this.objectInternment.vehicleEntity.vehicleBrandEntity.id);
        if(this.objectInternment.vehicleEntity.plateEntity != null) this.formInternment.get('vehicle.plate')?.setValue( this.objectInternment.vehicleEntity.plateEntity.plate);
        if(this.objectInternment.vehicleEntity.color != null) this.formInternment.get('vehicle.color')?.setValue( this.objectInternment.vehicleEntity.color);
        if(this.objectInternment.admissionTicketEntity.ownerEntity.name != null) this.formInternment.get('admission_ticket.owner.name')?.setValue(this.objectInternment.admissionTicketEntity.ownerEntity.name);
        if(this.objectInternment.admissionTicketEntity.ownerEntity.lastname != null) this.formInternment.get('admission_ticket.owner.lastname')?.setValue(this.objectInternment.admissionTicketEntity.ownerEntity.lastname);
        if(this.objectInternment.admissionTicketEntity.ownerEntity.address != null) this.formInternment.get('admission_ticket.owner.address')?.setValue(this.objectInternment.admissionTicketEntity.ownerEntity.address);
        if(this.objectInternment.admissionTicketEntity.ownerEntity.phone != null) this.formInternment.get('admission_ticket.owner.phone')?.setValue(this.objectInternment.admissionTicketEntity.ownerEntity.phone);
        if(this.objectInternment.admissionTicketEntity.remitterEntity.authority != null) this.formInternment.get('admission_ticket.remitter.authority')?.setValue(this.objectInternment.admissionTicketEntity.remitterEntity.authority);
        if(this.objectInternment.admissionTicketEntity.remitterEntity.ballot != null) this.formInternment.get('admission_ticket.remitter.ballot')?.setValue(this.objectInternment.admissionTicketEntity.remitterEntity.ballot);
        if(this.objectInternment.admissionTicketEntity.remitterEntity.infractionEntity != null) this.formInternment.get('admission_ticket.remitter.infraction')?.setValue(this.objectInternment.admissionTicketEntity.remitterEntity.infractionEntity.id);
        if(this.objectInternment.admissionTicketEntity.vehicleEntity.vehicleTypeEntity != null) this.formInternment.get('admission_ticket.vehicle.type')?.setValue(this.objectInternment.admissionTicketEntity.vehicleEntity.vehicleTypeEntity.id);
        if(this.objectInternment.admissionTicketEntity.vehicleEntity.vehicleBrandEntity != null) this.formInternment.get('admission_ticket.vehicle.brand')?.setValue(this.objectInternment.admissionTicketEntity.vehicleEntity.vehicleBrandEntity.id);
        if(this.objectInternment.admissionTicketEntity.vehicleEntity.plateEntity != null) this.formInternment.get('admission_ticket.vehicle.plate')?.setValue(this.objectInternment.admissionTicketEntity.vehicleEntity.plateEntity.plate);
        if(this.objectInternment.admissionTicketEntity.vehicleEntity.color != null) this.formInternment.get('admission_ticket.vehicle.color')?.setValue(this.objectInternment.admissionTicketEntity.vehicleEntity.color);
        if(this.objectInternment.admissionTicketEntity.number != null) this.formInternment.get('admission_ticket.number')?.setValue(this.objectInternment.admissionTicketEntity.number);
        if(this.objectInternment.admissionTicketEntity.observations != null) this.formInternment.get('admission_ticket.observations')?.setValue(this.objectInternment.admissionTicketEntity.observations);
        if(this.objectInternment.admissionTicketEntity.in_charge != null) this.formInternment.get('admission_ticket.in_charge')?.setValue(this.objectInternment.admissionTicketEntity.in_charge);
        if(this.objectInternment.freedom_number != null) this.formInternment.get('freedom_number')?.setValue(this.objectInternment.freedom_number);
        if(this.objectInternment.infractionEntity != null) this.formInternment.get('infraction')?.setValue(this.objectInternment.infractionEntity.id);
      })
    }

    this.formInternment.get('admission_ticket.vehicle.type')?.disable();
    this.formInternment.get('admission_ticket.vehicle.brand')?.disable();
    this.formInternment.get('admission_ticket.vehicle.plate')?.disable();
    this.formInternment.get('admission_ticket.vehicle.color')?.disable();
    this.formInternment.get('infraction')?.disable();

    this.internmentOld = this.formInternment.value;
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
      this.internmentNew = this.formInternment.value;
      if (this.internmentOld != this.internmentNew) {
        this.internmentService.putInfraction(this.internmentNew, this.idInternment).subscribe(data =>{
          console.log(data);
          this.backInternment.emit(false);
        })
      }
      console.log(this.formInternment.value);
    }
  }

  builderInternment(){
    this.formInternment = this.formBuilder.group({
      vehicle: this.formBuilder.group({
        type: [0 ,Validators.required],
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
