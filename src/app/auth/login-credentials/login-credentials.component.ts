declare var google: any; // Declare google variable for Google Sign-In
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MainServiceService } from 'src/app/main-service.service';
import { UserAuthService } from 'src/app/user-auth.service';

@Component({
  selector: 'app-login-credentials',
  templateUrl: './login-credentials.component.html',
  styleUrls: ['./login-credentials.component.scss']
})
export class LoginCredentialsComponent {
  constructor(private route: Router,
    private mainService: MainServiceService,
    private userAuthSevice: UserAuthService) { }

     form = new FormGroup({
        name: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });


  signIn() {
    this.mainService.login(this.form.value).subscribe(
      (response: any) => {
        alert("Login Successful");
        this.userAuthSevice.setRoles(response.data.authority);
        this.userAuthSevice.setToken(response.data.jwtToken);
        this.userAuthSevice.setUserName(response.data.username);
        this.userAuthSevice.setUserId(response.data.id);
        if (response.data.authority === "ADMIN") {
          this.route.navigate(['/admin-dashboard']);
        } else if (response.data.authority === "USER") {
          this.route.navigate(['/dashboard']);
        } else if (response.data.authority === "PHARMACY") {
          this.route.navigate(['/dashboard-pharmacist']);
        } else {
          this.route.navigate(['/']);
        }

      }, (error: any) => {
        this.route.navigate(['/']);
        alert("Invalid Credentials");
      }
    );
    this.route.navigate(['/dashboard']);
  }

}
