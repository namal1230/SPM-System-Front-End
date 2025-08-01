import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPharmacistComponent } from './dashboard-pharmacist/dashboard-pharmacist.component';
import { HeadingComponent } from './heading/heading.component';
import { FooterComponent } from './footer/footer.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    DashboardPharmacistComponent,
    HeadingComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatTabsModule
  ],
  exports: [
    DashboardPharmacistComponent
  ]
})
export class PharmacistModule { }
