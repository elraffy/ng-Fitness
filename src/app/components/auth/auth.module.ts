import { NgModule } from '@angular/core';
import { SigupComponent } from './sigup/sigup.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({

  declarations:[ SigupComponent,LoginComponent],
  imports:[
            AngularFireAuthModule,
            ReactiveFormsModule,
            SharedModule,
            AuthRoutingModule
  ],
  exports:[]
})
export class AuthModule{

}
