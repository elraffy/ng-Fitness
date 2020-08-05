import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../../shared/ui.service';
import {  Observable } from 'rxjs';
import * as fromRoot from '../../../app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent implements OnInit {

  maxDate;
  isLoading$ : Observable<boolean>;

  constructor( private authService: AuthService, private uiService: UIService,
    private store: Store<fromRoot.State> ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit( form: NgForm){
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
