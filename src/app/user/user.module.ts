import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadingComponent } from './heading/heading.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HeadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class UserModule { }
