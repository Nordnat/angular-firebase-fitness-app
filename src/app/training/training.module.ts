import {NgModule} from "@angular/core";
import {TrainingComponent} from "./training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {StopTrainingComponent} from "./current-training/stop-training.component";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {SharedModule} from "../shared/shared.module";
import {TrainingRoutingModule} from "./training-routing.module";
import {Store, StoreModule} from "@ngrx/store";
import {TrainingReducer} from "./training.reducer";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', TrainingReducer)
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
