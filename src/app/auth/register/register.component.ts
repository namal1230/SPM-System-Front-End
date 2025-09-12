import { Component } from '@angular/core';
import { MainServiceService } from 'src/app/main-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent {

  constructor(private mainService:MainServiceService) { }

  public onSubmit(form: any): void {
    this.mainService.register(form.value).subscribe(
      (response:any)=>{
        console.log(response);
        alert("Registration Successful");
        form.reset();
      },(error:any)=>{
        console.log(error);
        alert("Registration Failed");
      }
    );
  }
}
