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
export class AppComponent implements OnInit{

  
  ngOnInit(){
    Payhere.init("1232056",AccountCategory.SANDBOX);
  }

  title = 'SPM-System-Front-End';

  constructor(private auth: AuthService,router:Router) {
    window.handleCredentialResponse = (response: any) => {
      const idToken = response.credential;
      console.log("Google ID Token:", idToken);

      // send to backend
      this.auth.loginWithGoogle(idToken).subscribe({
        next: (res:any) => {
          localStorage.setItem('token', res.jwtToken);
          localStorage.setItem('userRole', res.authority);
          localStorage.setItem('id', res.id);
          console.log("Backend JWT:", res.jwtToken);
          
          if(res.authority==="User not found" || res.authority==="User Not Found"){
            alert("User not found! Please register first.");
          } else if(res.authority==="ADMIN"){
              router.navigate(['/admin-dashboard']);
          } else if(res.authority==="USER"){
              router.navigate(['/dashboard']);
          } else if(res.authority==="PHARMACY"){
              router.navigate(['/dashboard-pharmacist']);
          }
        },
        error: (err) => console.error(err)
      });
    };
  }
}
