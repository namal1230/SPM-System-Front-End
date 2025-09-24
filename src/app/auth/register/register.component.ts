import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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

  public form = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmpassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.mainService.register(this.form.value).subscribe(
        (response: any) => {
          alert("Registration Successful");
          this.router.navigateByUrl('/');
        }, (error: any) => {
          alert("Registration Failed");
        }
      );
    } else {
      alert("Form Invalid or Passwords Do Not Match");
    }
  }

}
