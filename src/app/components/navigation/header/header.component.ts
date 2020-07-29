import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>(); // tipo void para no emittir payload
  isAuth: boolean = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   this.authSubscription = this.authService.authChanges.subscribe(authStatus => {
      this.isAuth = authStatus;

    });
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
  ngOnDestroy(): void {
     this.authSubscription.unsubscribe();
  }
  onLogout(){
    this.authService.logOut();
  }

}
