import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  BaseUrl = 'http://localhost:8080/';
  constructor(private httpClient:HttpClient) { }

  requestHeader=new HttpHeaders({'No-Auth':'True'});

  public login(data:any){
    return this.httpClient.get(this.BaseUrl+'api/v1/auth/login?name='+data.username+'&password='+data.password);
  }

  public register(data:any){
    return this.httpClient.post(this.BaseUrl+'api/v1/auth/register',{
      "userName":data.username,
      "password":data.password,
      "email":data.email,
      "role":data.role
    });
  }
}