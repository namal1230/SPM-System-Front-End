import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/user-auth.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {
  
  constructor(private userAuth:UserAuthService) { }
  
  signOut(){
    this.userAuth.clear();
  }
}
