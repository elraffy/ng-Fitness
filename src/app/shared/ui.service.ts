import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIService{

  constructor(private snackbar: MatSnackBar){}
  showSnarckbar(message, action, duration){
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
