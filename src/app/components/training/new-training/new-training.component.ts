import { Component, OnInit} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UIService } from '../../../shared/ui.service';
import * as fromTraining from './../training.reducer'
import * as fromRoot from '../../../app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
 // @Output() trainingStart = new EventEmitter<void>();
  exercises$: Observable<Exercise[]>;
  isLoading$ : Observable<boolean>;


  constructor( private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
      this.fetchExercises();
    }

    fetchExercises(){
      this.trainingService.fetchAvailableExercises();
    }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

}
