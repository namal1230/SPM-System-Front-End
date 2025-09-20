import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadingComponent } from './heading/heading.component';
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { FindPageComponent } from './find-page/find-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "src/app/app-routing.module";
import { MatTableModule } from '@angular/material/table';
import { AiAssistantComponent } from './ai-assistant/ai-assistant.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { UserRequestComponent } from './user-request/user-request.component';
import { AcceptRequestComponent } from './accept-request/accept-request.component';
import { RejectRequetComponent } from './reject-requet/reject-requet.component';
import { RequestOverviewComponent } from './request-overview/request-overview.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [
    DashboardComponent,
    HeadingComponent,
    HomePageComponent,
    FooterComponent,
    FindPageComponent,
    AiAssistantComponent,
    UserRequestComponent,
    AcceptRequestComponent,
    RejectRequetComponent,
    RequestOverviewComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    GoogleMapsModule,
    FormsModule,
    AppRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [
    DashboardComponent,
    HomePageComponent,
    FooterComponent,
    FindPageComponent,
    AiAssistantComponent,
    UserRequestComponent
  ]
})
export class UserModule { }
