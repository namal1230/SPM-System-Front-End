import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { RequestServiceService } from 'src/app/request-service.service';
import { OTPVerificationComponent } from '../otpverification/otpverification.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-credentials',
  templateUrl: './forgot-credentials.component.html',
  styleUrls: ['./forgot-credentials.component.scss']
})
export class ForgotCredentialsComponent {


  form = new FormGroup({
    email: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient,
    private request: RequestServiceService,
    private router: Router
  ) { }

  login() {
    this.http.get<any>(this.request.baseUrl + 'auth/find-user?Username=' + this.form.get('userName')?.value + '&email=' + this.form.get('email')?.value)
      .subscribe(res => {
        if (res) {
          this.request.setData({
            username: this.form.get('userName')?.value,
            email: this.form.get('email')?.value
          });
          alert("User Found! Proceed to OTP Verification");
          this.router.navigateByUrl('/otp-verification');
        }
      });
  }
}
