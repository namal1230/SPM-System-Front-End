import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPharmacistComponent } from './dashboard-pharmacist/dashboard-pharmacist.component';
import { HeadingComponent } from './heading/heading.component';
import { FooterComponent } from './footer/footer.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from "src/app/app-routing.module";
import { AiPharmacistComponent } from './ai-pharmacist/ai-pharmacist.component';
import { SaveMedicineComponent } from './save-medicine/save-medicine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateMedicineComponent } from './update-medicine/update-medicine.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldControl } from '@angular/material/form-field';


@NgModule({
  declarations: [
    DashboardPharmacistComponent,
    HeadingComponent,
    FooterComponent,
    AiPharmacistComponent,
    SaveMedicineComponent,
    UpdateMedicineComponent,
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
],
  exports: [
    DashboardPharmacistComponent,
    AiPharmacistComponent
  ]
})
export class PharmacistModule { }
