import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  authSubscription: Subscription;

  @Output() closeSidenav = new EventEmitter<void>();

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
   this.authSubscription =  this.authService.authChanges.subscribe( authStatus => {
      this.isAuth = authStatus;
    });
  }

  onClose(){
    this.closeSidenav.emit();
  }
  onLogout(){
    this.authService.logOut();
    this.onClose();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();

  }

}
