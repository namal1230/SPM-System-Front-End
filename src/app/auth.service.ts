import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  loginWithGoogle(idToken: string) {
    return this.http.post<{ token: string; email: string; name: string; picture: string }>(
      `${this.base}/google`,
      { idToken }
    );
  }
}
