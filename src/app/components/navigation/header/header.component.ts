import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {  Observable} from 'rxjs';

// Statemanegement
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>(); // tipo void para no emittir payload
  isAuth$: Observable<boolean>;


  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit(): void {
         this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }
  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
  onLogout(){
    this.authService.logOut();
  }

}
