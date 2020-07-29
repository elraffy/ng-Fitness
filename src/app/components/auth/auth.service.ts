import { Subject } from 'rxjs';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../../shared/ui.service';



@Injectable()
export class AuthService{
  authChanges =  new Subject<boolean>(); // Operador Subject hace lo mismo que un EventEmitter
  private isAuthenticated= false;

  constructor( private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private snackbar: MatSnackBar,
                private uiService: UIService){}

  initAuthListener(){
    this.afAuth.authState.subscribe(user => {
       if(user){
              this.isAuthenticated = true;
              this.authChanges.next(true);
              this.router.navigate(['/training']);
       }else{
              this.trainingService.cancelSubscriptions();
              this.authChanges.next(false);
              this.router.navigate(['/login']);
              this.isAuthenticated = false;

       }
    });
  }

  registerUser(authData: AuthData){
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password).then( result =>{
        this.uiService.loadingStateChanged.next(true);
      }).catch(e => {
        this.uiService.loadingStateChanged.next(false);
       this.snackbar.open(e.message, null, {
         duration: 3000
       });
      });

  }
  login( authData: AuthData ){
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(
      authData.email,
      authData.password).then(result => {
          this.uiService.loadingStateChanged.next(false);
      }).catch(err =>{
        this.uiService.loadingStateChanged.next(false);
        this.snackbar.open(err.message, null, {
          duration: 3000
        });
      })

       }
  logOut(){
    this.afAuth.signOut();
  }

  isAuth(){
    return this.isAuthenticated;
  }

}
