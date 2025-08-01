import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoginCredentialsComponent } from './auth/login-credentials/login-credentials.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { FindPageComponent } from './user/find-page/find-page.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { AiAssistantComponent } from './user/ai-assistant/ai-assistant.component';
import { DashboardPharmacistComponent } from './pharmacist/dashboard-pharmacist/dashboard-pharmacist.component';

const routes: Routes = [
  {path: '',component: LoginComponent, children:[
    {path:'',component:LoginCredentialsComponent},
    {path:'register',component:RegisterComponent}
  ]},
  // {path: 'dashboard', component: DashboardComponent, children: [
  //   {path: '', redirectTo: 'home', pathMatch: 'full'},
  //   {path: 'home', component: HomePageComponent},
  //   {path: 'find-page', component: FindPageComponent}
  // ]},
  {path: 'find-page', component: FindPageComponent},
  {path: 'ai-assistant',component: AiAssistantComponent},
  {path: 'dashboard', component: DashboardPharmacistComponent, children: [
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
