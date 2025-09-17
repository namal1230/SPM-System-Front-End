import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "src/app/app-routing.module";
import { LoginCredentialsComponent } from './login-credentials/login-credentials.component';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import { ForgotCredentialsComponent } from './forgot-credentials/forgot-credentials.component';
import { GoogleAuthenticationComponent } from './google-authentication/google-authentication.component';
import { ObserversModule } from "@angular/cdk/observers";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PharmacyRegistrationComponent } from './pharmacy-registration/pharmacy-registration.component';


@NgModule({
  declarations: [
    LoginComponent,
    LoginCredentialsComponent,
    RegisterComponent,
    ForgotCredentialsComponent,
    GoogleAuthenticationComponent,
    PharmacyRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    ObserversModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
],
  exports: [
    LoginComponent,
    LoginCredentialsComponent,
    RegisterComponent,
    ForgotCredentialsComponent
  ]
})
export class AuthModule { }
