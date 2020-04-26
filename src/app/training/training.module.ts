import {NgModule} from "@angular/core";
import {TrainingComponent} from "./training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {MaterialModule} from "../material.module";
import {FormsModule} from "@angular/forms";
import {TrainingService} from "./training.service";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {StopTrainingComponent} from "./current-training/stop-training.component";
import {AngularFirestoreModule} from "angularfire2/firestore";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    AngularFirestoreModule,
  ],
  providers: [

  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
