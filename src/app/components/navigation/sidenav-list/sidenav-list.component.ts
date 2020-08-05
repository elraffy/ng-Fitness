import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

// Statemanagement
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  isAuth$: Observable<boolean>;

  @Output() closeSidenav = new EventEmitter<void>();

  constructor( private authService: AuthService, private store: Store<fromRoot.State> ) { }

  ngOnInit(): void {
       this.isAuth$ =  this.store.select(fromRoot.getIsAuth);
  }
  onClose(){
    this.closeSidenav.emit();
  }
  onLogout(){
    this.authService.logOut();
    this.onClose();
  }

}
