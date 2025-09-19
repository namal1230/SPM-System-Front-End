import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadingComponent } from './heading/heading.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { ReportUsersComponent } from './report-users/report-users.component';
import { ActivePharmacyComponent } from './active-pharmacy/active-pharmacy.component';
import { PharmacyRequestComponent } from './pharmacy-request/pharmacy-request.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReportedPharmacyComponent } from './reported-pharmacy/reported-pharmacy.component';
import { OverViewComponent } from './over-view/over-view.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeadingComponent,
    FooterComponent,
    ActiveUsersComponent,
    ReportUsersComponent,
    ActivePharmacyComponent,
    PharmacyRequestComponent,
    ReportedPharmacyComponent,
    OverViewComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatTabsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  exports: [
    DashboardComponent,
    HeadingComponent,
    FooterComponent,
    HttpClientModule,
    OverViewComponent
  ]
})
export class AdminModule { }
