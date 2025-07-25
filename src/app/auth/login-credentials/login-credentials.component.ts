declare var google: any; // Declare google variable for Google Sign-In
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-credentials',
  templateUrl: './login-credentials.component.html',
  styleUrls: ['./login-credentials.component.scss']
})
export class LoginCredentialsComponent  {

  constructor(private route:Router) { }

  signIn(){
    this.route.navigate(['/dashboard']);
  }

}
