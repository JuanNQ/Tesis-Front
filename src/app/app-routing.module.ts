import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternmentComponent } from "src/app/Pages/internment/internment.component";
import { NotFoundComponent } from "src/app/Pages/not-found/not-found.component";
import { HomeComponent } from "src/app/Pages/home/home.component";

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo : 'Internment',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'Internment',
  //   component : InternmentComponent
  // },
  // {
  //   path:'**',
  //   component:NotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
