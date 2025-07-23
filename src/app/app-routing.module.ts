import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoginCredentialsComponent } from './auth/login-credentials/login-credentials.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';

const routes: Routes = [
  {path: '',component: LoginComponent, children:[
    {path:'',component:LoginCredentialsComponent},
    {path:'register',component:RegisterComponent}
  ]},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
