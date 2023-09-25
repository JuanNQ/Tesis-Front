import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InternmentService } from "src/app/service/internment.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    private internmentService: InternmentService,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, type: string, brand: string, plate: string, number: number}) {}


  delete(){
    this.internmentService.deleteInternment(this.data.id).subscribe();
  }
}
