import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { AuthemployeeGuard } from './auth/components/authemployee.guard';
import { ClientInterfaceComponent } from './client-interface/client-interface.component';
import { MainClientComponent } from './main-client/main-client.component';
import { MovetowhereComponent } from './movetowhere/movetowhere.component';
import { ReloadComponent } from './reload/reload.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { VideopageComponent } from './videopage/videopage.component';

const routes: Routes = [
  {path: '', redirectTo: 'reload', pathMatch:'full'},
  {path: 'reload', component: ReloadComponent},
  {path: 'main', component: VideopageComponent},
  {path: 'signup', component: SignupComponent},
  {path:'signin',component:SigninComponent},
  {path: 'client',  canActivate:[AuthemployeeGuard],  component: MovetowhereComponent  ,
    children: [
      {path:'interface',component:ClientInterfaceComponent},
      {path: 'mainclient' , component:MainClientComponent},
    ]
  }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
