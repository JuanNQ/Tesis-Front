import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {WebcamModule} from 'ngx-webcam';
import {CameraComponent} from './Components/camera/camera.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MyCustomPaginatorIntl, PagerFilterComponent} from "src/app/Components/pager-filter/pager-filter.component";
import { DialogComponent } from "src/app/Components/dialog/dialog.component";
import {MatDialogModule} from '@angular/material/dialog';
import { InternmentComponent } from "src/app/Pages/internment/internment.component";
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { HomeComponent } from './Pages/home/home.component';
import { NewInternmentComponent } from './Pages/internment/new-internment/new-internment.component';
import { EditInternmentComponent } from './Pages/internment/edit-internment/edit-internment.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    PagerFilterComponent,
    DialogComponent,
    InternmentComponent,
    NotFoundComponent,
    HomeComponent,
    NewInternmentComponent,
    EditInternmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    WebcamModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule
  ],
  entryComponents: [DialogComponent],
  providers: [
    {provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
