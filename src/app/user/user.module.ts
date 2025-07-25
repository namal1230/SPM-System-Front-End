import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadingComponent } from './heading/heading.component';
import {MatTabsModule} from '@angular/material/tabs'
import {MatIconModule} from '@angular/material/icon';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeadingComponent,
    HomePageComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule
  ],
  exports: [
    DashboardComponent,
    HomePageComponent,
    FooterComponent
  ]
})
export class UserModule { }
