declare var google: any; // Declare google variable for Google Sign-In
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MainServiceService } from 'src/app/main-service.service';
import { UserAuthService } from 'src/app/user-auth.service';

@Component({
  selector: 'app-login-credentials',
  templateUrl: './login-credentials.component.html',
  styleUrls: ['./login-credentials.component.scss']
})
export class LoginCredentialsComponent  {
  constructor(private route:Router,
    private mainService:MainServiceService,
    private userAuthSevice:UserAuthService) { }

  signIn(loginForm:NgForm){
    this.mainService.login(loginForm.value).subscribe(
      (response:any)=>{
        alert("Login Successful");
        console.log(response.jwtToken);
        this.userAuthSevice.setRoles(response.authority);
        this.userAuthSevice.setToken(response.jwtToken);
        this.userAuthSevice.setUserName(response.username);

        if(response.authority==="ADMIN"){
          console.log("admin");
          this.route.navigate(['/dashboard-pharmacist']);
        } else if(response.authority==="USER"){
          console.log("user");
          this.route.navigate(['/dashboard']);
        } else if(response.authority==="PHARMACY"){
          console.log("pharmacy");
          this.route.navigate(['/dashboard-pharmacist']);
        } else {
          console.log("unknown user");
          this.route.navigate(['/']);
        }
        console.log(response);
      },(error:any)=>{
        console.log(error);
        this.route.navigate(['/']);
        alert("Invalid Credentials");
      }
    );
    this.route.navigate(['/dashboard']);
  }

}
