import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadingComponent } from './heading/heading.component';
import {MatTabsModule} from '@angular/material/tabs'
import {MatIconModule} from '@angular/material/icon';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { FindPageComponent } from './find-page/find-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from "src/app/app-routing.module";
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    DashboardComponent,
    HeadingComponent,
    HomePageComponent,
    FooterComponent,
    FindPageComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    GoogleMapsModule,
    FormsModule,
    AppRoutingModule,
    MatTableModule
],
  exports: [
    DashboardComponent,
    HomePageComponent,
    FooterComponent,
    FindPageComponent
  ]
})
export class UserModule { }
