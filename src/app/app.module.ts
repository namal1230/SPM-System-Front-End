import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserModule } from './user/user.module';
import { HomePageComponent } from './user/home-page/home-page.component';
import { FooterComponent } from './user/footer/footer.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PharmacistModule } from './pharmacist/pharmacist.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    UserModule,
    PharmacistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
