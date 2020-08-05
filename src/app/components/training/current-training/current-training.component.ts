import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';

import * as fromTraining from '../training.reducer';



@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExits = new EventEmitter();
  progress = 0;
  timer: number;

  constructor( private dialog: MatDialog,
                private traininService: TrainingService,
                private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.stropOrResumeTimer();

  }
  stropOrResumeTimer(){
    this.store.select(fromTraining.getActiveTraining).subscribe( ex => {
      const step = ex.duration /100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if( this.progress >=100 ){
          this.traininService.completeExercise();
          clearInterval(this.timer);
        }
      },step);
    });

  }

  onStop(){
    clearInterval(this.timer);
    const dialogRef= this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result){
        this.traininService.cancelExercise(this.progress);
      }else{
        this.stropOrResumeTimer();
      }
    });
  }

}
