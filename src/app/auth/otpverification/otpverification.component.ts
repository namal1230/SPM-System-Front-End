import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestServiceService } from 'src/app/request-service.service';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.scss']
})
export class OTPVerificationComponent implements OnInit {


  form = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    otp: new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient,
    private request: RequestServiceService,
    private router: Router
  ) { }

  username: any;
  email: any;
  ngOnInit(): void {
    this.request.currentData.subscribe(data => {
      if (data) {
        this.username = data.username;
        this.email = data.email;
      }
    });
  }

  login() {
    this.http.post<any>(this.request.baseUrl + 'auth/update', {
      name: this.username,
      email: this.email,
      password: this.form.get('password')?.value,
      otp: this.form.get('otp')?.value
    })
      .subscribe(res => {
        if (res) {
          alert('Password Updated Successfully..!')
          this.router.navigateByUrl('/');
        }
      });
  }
}
