import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/main-service.service';
import { RequestServiceService } from 'src/app/request-service.service';

@Component({
  selector: 'app-pharmacy-registration',
  templateUrl: './pharmacy-registration.component.html',
  styleUrls: ['./pharmacy-registration.component.scss']
})
export class PharmacyRegistrationComponent {
  constructor(private http: HttpClient,
      private request:RequestServiceService) { }
  
      form=new FormGroup({
        name:new FormControl('',Validators.required),
        email:new FormControl('',Validators.required),
        address:new FormControl('',Validators.required),
        contact:new FormControl('',Validators.required),
        password:new FormControl('',Validators.required),
        confirmpassword:new FormControl('',Validators.required),
        userName:new FormControl('',Validators.required)
      })
      onSubmit() {
        this.http.post<any>(this.request.baseUrl+'pharmacy/register-request',{
          name:this.form.get('name')?.value,
          email:this.form.get('email')?.value,
          address:this.form.get('address')?.value,
          contact:this.form.get('contact')?.value,
          password:this.form.get('password')?.value,
          userName:this.form.get('userName')?.value
        })
        .subscribe(res=>{
          if(res){
            alert('Pharmacy Registration Request Send..!')
          }
        });
    }
}
