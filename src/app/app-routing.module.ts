import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './components/auth/auth.guard';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'training', loadChildren:
          () => import('./components/training/training.module')
          .then(m => m.TrainingModule),canLoad:[AuthGuard]},
  {path:'notFound', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
