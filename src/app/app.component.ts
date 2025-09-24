import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Payhere, AccountCategory } from '@payhere-js-sdk/client';

declare global {
  interface Window { handleCredentialResponse: any; }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    Payhere.init("1232056", AccountCategory.SANDBOX);
  }

  title = 'SPM-System-Front-End';

  constructor(private auth: AuthService, router: Router) {
    window.handleCredentialResponse = (response: any) => {
      const idToken = response.credential;
      localStorage.setItem("Google ID", idToken);

      this.auth.loginWithGoogle(idToken).subscribe({
        next: (res: any) => {
          const data = res.data;
          localStorage.setItem('token', data.jwtToken);
          localStorage.setItem('userRole', data.authority);
          localStorage.setItem('id', data.id);

          if (data.authority === "User not found" || res.data.authority === "User Not Found") {
            alert("User not found! Please register first.");
          } else if (data.authority === "ADMIN") {
            router.navigate(['/admin-dashboard']);
          } else if (data.authority === "USER") {
            router.navigate(['/dashboard']);
          } else if (data.authority === "PHARMACY") {
            router.navigate(['/dashboard-pharmacist']);
          }
        },
        error: (err) => { }
      });
    };
  }
}
