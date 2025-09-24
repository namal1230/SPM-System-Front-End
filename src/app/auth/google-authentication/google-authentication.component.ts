import { Component } from '@angular/core';
import { OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Route, Router } from '@angular/router';
import { MainServiceService } from 'src/app/main-service.service';
import { UserAuthService } from 'src/app/user-auth.service';
declare const google: any;

@Component({
  selector: 'app-google-authentication',
  templateUrl: './google-authentication.component.html',
  styleUrls: ['./google-authentication.component.scss']
})

export class GoogleAuthenticationComponent {
  private CLIENT_ID = '29161724059-4nqt8jhluupqi35ufpaqotu1ak2gfbaa.apps.googleusercontent.com';
  constructor(private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: this.CLIENT_ID,
      callback: (response: any) => this.handleCredentialResponse(response.data),
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }

  handleCredentialResponse(response: any) {
    const idToken = response.data.credential;
    this.auth.loginWithGoogle(idToken).subscribe({
      next: (res: any) => {
        alert('Login Successful..!' + res.data.authority);
        localStorage.setItem('app_jwt', res.data.jwtToken);
        this.route.navigate(['/dashboard']);
      },
      error: (err) =>{}
    });
  }
}
