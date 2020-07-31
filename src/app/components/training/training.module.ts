import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

//Commponentes
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from '../../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';


@NgModule({
  declarations:[TrainingComponent,
                CurrentTrainingComponent,
                NewTrainingComponent,
                PastTrainingsComponent,
                StopTrainingComponent
                ],
  imports:[
    AngularFirestoreModule,
    SharedModule,
    TrainingRoutingModule
  ],
  exports:[],
  entryComponents:[StopTrainingComponent]
})


export class TrainingModule{}
