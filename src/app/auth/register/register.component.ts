import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/main-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent {

  constructor(private mainService: MainServiceService,
    private router: Router
  ) { }

  public onSubmit(form: any): void {
    this.mainService.register(form.value).subscribe(
      (response: any) => {
        alert("Registration Successful");
        this.router.navigateByUrl('/');
      }, (error: any) => {
        alert("Registration Failed");
      }
    );
  }
}
