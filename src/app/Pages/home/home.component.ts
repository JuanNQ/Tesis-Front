import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  numericSidebar : number = 0;

  statusSidebar(value: number){
    this.numericSidebar = value;
  }

}
