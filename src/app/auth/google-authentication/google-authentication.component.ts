import { Component } from '@angular/core';
import { OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Route, Router } from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-google-authentication',
  templateUrl: './google-authentication.component.html',
  styleUrls: ['./google-authentication.component.scss']
})

export class GoogleAuthenticationComponent {
 private CLIENT_ID = '29161724059-4nqt8jhluupqi35ufpaqotu1ak2gfbaa.apps.googleusercontent.com';
constructor(private auth: AuthService, private ngZone: NgZone,private route:Router) {}

  ngOnInit(): void {
    // initialize GSI
    google.accounts.id.initialize({
      client_id: this.CLIENT_ID,
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    // render the button
    google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }

  handleCredentialResponse(response: any) {
    // response.credential is the ID token (JWT)
    const idToken = response.credential;
    // send to backend to verify & exchange for app JWT
    this.auth.loginWithGoogle(idToken).subscribe({
      next: (res) => {
        console.log(res);
        // res should contain your app JWT (e.g. { token: '...' })
        localStorage.setItem('app_jwt', res.token);
        this.route.navigate(['/dashboard']);
      },
      error: (err) => console.error(err)
    });
  }
}
