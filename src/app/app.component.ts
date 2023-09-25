import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {WebcamImage} from 'ngx-webcam';
import { PlateService } from "src/app/service/plate.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from "src/app/Components/dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'Botones'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  public webcamImage: WebcamImage | null = null;
  numericSidebar : number = 1;
  formInternment : FormGroup = new FormGroup ('');
  dateTime : Date = new Date;
  formattedDate : string = '';
  formattedTime : string = '';
  minDate: Date = new Date;
  buttonEdit: boolean = true;

  constructor(
    private plateService: PlateService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
    ) {
      this.builderFormInternment();
    }

  ngOnInit(): void {
    this.formattedDate = this.formatDate(this.dateTime);
    this.formattedTime = this.formatTime(this.dateTime);
    this.minDate = new Date(this.dateTime.getFullYear() - 0, this.dateTime.getMonth(), this.dateTime.getDate());
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  caca(dato:any){
    console.log(dato);

  }

  formatDate(d: Date) {
    let year = d.getFullYear();
    // Se suma 1 al mes porque en JavaScript, los meses van de 0 (enero) a 11 (diciembre)
    let month = ('0' + (d.getMonth() + 1)).slice(-2);
    let day = ('0' + d.getDate()).slice(-2);

    return `${year}/${month}/${day}`;
  }

  formatTime(t: Date) {
    let hour = ('0' + t.getHours()).slice(-2);
    let minute = ('0' + t.getMinutes()).slice(-2);
    let second = ('0' + t.getSeconds()).slice(-2);

    return `${hour}:${minute}:${second}`;
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.onFileSelected();
  }

  statusSidebar(value: number){
    this.numericSidebar = value;
  }

  onFileSelected() {
    // const file = event.target.files[0];
    // console.log(file);

    this.plateService.recognizePlate(this.webcamImage).subscribe(data =>{
      console.log(data);

    });
  }

  prueba(){
    this.formInternment.get('output_date')?.enable();
  }

  clickedRows(dato: any){
    console.log(dato);

  }

  private builderFormInternment(){
    this.formInternment = this.formBuilder.group({
      input_date: ['',[Validators.required]],
      output_date: new FormControl({value: '', disabled: true}),
      input_time: ['',[Validators.required]],
      output_time: [''],
      vehicle: {
        type: ['',Validators.required],
        brand: ['',Validators.required],
        plate: ['',Validators.required],
        color: ['',Validators.required]
      },
      admission_ticket: {
        owner : {
          name : ['',Validators.required],
          lastname : ['',Validators.required],
          address : ['',Validators.required],
          phone : ['',Validators.required],
        },
        remitter : {
          authority : ['',Validators.required],
          ballot : ['',Validators.required],
          infraction : ['',Validators.required],
        },
        vehicle: {
          type: ['',Validators.required],
          brand: ['',Validators.required],
          plate: ['',Validators.required],
          color: ['',Validators.required]
        },
        number : ['',Validators.required],
        observations : ['',Validators.required],
        in_charge : ['',Validators.required],
      },
      freedom_number : ['',Validators.required],
      infraction : ['',Validators.required]
    })
  }




}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
