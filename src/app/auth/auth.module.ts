import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from "src/app/app-routing.module";
import { LoginCredentialsComponent } from './login-credentials/login-credentials.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    LoginCredentialsComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    MatSlideToggleModule
],
  exports: [
    LoginComponent,
    LoginCredentialsComponent
  ]
})
export class AuthModule { }
