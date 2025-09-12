import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

declare global {
  interface Window { handleCredentialResponse: any; }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SPM-System-Front-End';

  constructor(private auth: AuthService,router:Router) {
    window.handleCredentialResponse = (response: any) => {
      const idToken = response.credential;
      console.log("Google ID Token:", idToken);

      // send to backend
      this.auth.loginWithGoogle(idToken).subscribe({
        next: (res:any) => {
          localStorage.setItem('app_jwt', res.token);
          console.log("Backend JWT:", res.jwtToken);
          if(res.authority==="User not found"){
            alert("User not found! Please register first.");
          } else if(res.authority==="ADMIN"){
              router.navigate(['/admin-dashboard']);
          } else if(res.authority==="USER"){
              router.navigate(['/dashboard']);
          } else if(res.authority==="PARMACY"){
              router.navigate(['/pharmacy-dashboard']);
          }
        },
        error: (err) => console.error(err)
      });
    };
  }
}
