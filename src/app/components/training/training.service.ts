import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { map} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UIService } from '../../shared/ui.service';




@Injectable()
export class TrainingService{
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();  private availableExercises: Exercise[] = [];
  finishedExercisesChanged = new Subject<Exercise[]>();
  private runningExercise: Exercise;
  private finishedExercises : Exercise [] = [];
  private fbSubs: Subscription[] = [];

  constructor( private db: AngularFirestore, private uiService: UIService ){}

  fetchAvailableExercises(){
    this.uiService.loadingStateChanged.next(true);
   this.fbSubs.push(this.db.collection('availableExercises')
       .snapshotChanges().pipe(
         map(docArray=>{
           return docArray.map(doc=>{
             return{
               id: doc.payload.doc.id,
               ...doc.payload.doc.data() as Exercise
             };
           });
         })
       ).subscribe((exercises: Exercise[]) =>{
              this.uiService.loadingStateChanged.next(false);
              this.availableExercises = exercises;
              this.exercisesChanged.next([...this.availableExercises]);
       }, error => {
           this.uiService.loadingStateChanged.next(false);
           this.uiService.showSnarckbar('Fetching exercises failed, please try later', null, 300);
           this.exercisesChanged.next([...this.availableExercises])
       }));
  }
  startExercise(selectedId: string){
    //this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find( ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
       }
  completeExercise(){
    this.addDataToDatabase({...this.runningExercise,
      date: new Date(),
      state:'complete'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise( progress: number){
    this.addDataToDatabase({...this.runningExercise,
      //name: this.runningExercise.name,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state:'cancelled'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise(){
    return {...this.runningExercise}
  }
  fetchCompleteOrCancelledExercises(){
   this.fbSubs.push( this.db.collection('finishedExercises')
    .valueChanges()
    .subscribe( (exercises: Exercise[]) =>{
      this.finishedExercises = exercises;
      this.finishedExercisesChanged.next(exercises);
    }));
  }

  cancelSubscriptions(){
    this.fbSubs.forEach( subs => subs.unsubscribe());
  }
  private addDataToDatabase( exercise: Exercise){
      this.db.collection('finishedExercises').add(exercise);
  }
}
