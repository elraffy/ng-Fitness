import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SigupComponent } from './components/auth/sigup/sigup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TrainingComponent } from './components/training/training.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './components/auth/auth.guard';



const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path:'signup', component: SigupComponent},
  {path:'login', component: LoginComponent},
  {path:'training', component: TrainingComponent, canActivate:[AuthGuard]},
  {path:'notFound', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
