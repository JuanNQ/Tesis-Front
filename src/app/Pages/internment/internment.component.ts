import { AfterViewInit, Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { PageEvent } from "@angular/material/paginator";
import { InternmentService } from "src/app/service/internment.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/Components/dialog/dialog.component";


@Component({
  selector: 'app-internment',
  templateUrl: './internment.component.html',
  styleUrls: ['./internment.component.scss']
})
export class InternmentComponent implements OnInit {
  displayedColumns: string[] = ['Tipo', 'Marca', 'Placa', 'N° Int.', 'Acciones'];

  pageIndex = 0;
  pageSize = 5 ;
  pageSizeOptions = [5,10,20,50];
  length = 0;
  pagina:PageEvent | null = null;
  // filtro: number = 0;
  search: string = '';
  internments : any = '';
  newIntern : boolean = false;
  editIntern : boolean = false;
  idInterment : number = 0;
  // @Input() backNewIntern = false;


  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  // public webcamImage: WebcamImage | null = null;
  numericSidebar : number = 1;
  formInternment : FormGroup = new FormGroup ('');
  dateTime : Date = new Date;
  formattedDate : string = '';
  formattedTime : string = '';
  minDate: Date = new Date;
  buttonEdit: boolean = true;
  @Output() objectInternment = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private internmentService: InternmentService,
    private matDialog:MatDialog
  ) {
      this.builderFormInternment();
  }

  ngOnInit(): void {
    this.formattedDate = this.formatDate(this.dateTime);
    this.formattedTime = this.formatTime(this.dateTime);
    this.minDate = new Date(this.dateTime.getFullYear() - 0, this.dateTime.getMonth(), this.dateTime.getDate());
    this.internmentService.getListInternment(this.pageSize,this.pageIndex,this.search).subscribe( data => {
      console.log(data);
      this.internments = data.content;
      this.length = data.totalElements;
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, object: any): void {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: object,
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==null || result=='') {
        this.internmentService.getListInternment(this.pageSize,this.pageIndex,this.search).subscribe( data => {
          this.internments = data.content;
          this.length = data.totalElements;
        })
      }
    });
  }

  edit(object: any){
    console.log(object);
    this.idInterment = object.id;
    this.editIntern = true;
  }

  newInternment(){
    this.newIntern = true;
  }
  backInternment(estado: boolean){
    this.newIntern = estado;
    this.editIntern = estado;
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


  searchSelect(searchOutput: string){
    this.pageIndex = 0;
    this.search = searchOutput.toLowerCase();
    console.log("searchSelect");

      this.internmentService.getListInternment(this.pageSize,this.pageIndex,this.search).subscribe(data=>{
        this.internments = data.content;
        this.length = data.totalElements;
        console.log(data);
      })

  }

  paginadoEvent(paginaOutput: PageEvent){
    console.log(paginaOutput);
    this.pagina = paginaOutput;
    this.length = paginaOutput.length;
    this.pageIndex = paginaOutput.pageIndex;
    this.pageSize = paginaOutput.pageSize;
    console.log("paginadoEvent");
      this.internmentService.getListInternment(this.pageSize,this.pageIndex,this.search).subscribe(data=>{
        this.internments = data.content;
        this.length = data.totalElements;
        console.log(data);
      })
  }


}
