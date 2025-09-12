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
        // console.log(response.jwtToken);

        if(response.authority==="ADMIN"){
          console.log("admin");
          this.route.navigate(['/dashboard-pharmacist']);
        } else if(response.authority==="USER"){
          console.log("user");
          this.route.navigate(['/dashboard']);
        }
        console.log(response);
      },(error:any)=>{
        console.log(error);
      }
    );
    this.route.navigate(['/dashboard']);
  }

}
