import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []) {
    localStorage.removeItem("roles");
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem("roles") || '[]');
  }

  public setUserName(username: string) {
     localStorage.removeItem("username");
    localStorage.setItem("username", username);
  }

  public getUserName(): string {
    return localStorage.getItem("username") || '';
  }


  public setToken(token: string) {
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
  }

  public getToken(): string {
    return localStorage.getItem("token") || '';
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public setUserId(id: number) {
    localStorage.removeItem("id");
    localStorage.setItem("id", id.toString());
  }

  public getUserId(): number {
    return Number(localStorage.getItem("id") || '');
  }
}
