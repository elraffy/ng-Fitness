import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigupComponent } from './sigup/sigup.component';



const routes : Routes = [
  {path:'signup', component: SigupComponent},
  {path:'login', component: LoginComponent},
];

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})

export class AuthRoutingModule {}
