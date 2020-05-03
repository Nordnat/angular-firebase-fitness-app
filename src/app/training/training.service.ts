import {ExerciseModel} from './exercise.model';
import {Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';
import {UiService} from "../shared/ui.service";
import * as UI from '../shared/ui.actions'
import * as fromRoot from '../app.reducer'
import * as fromTraining from '../training/training.reducer'
import * as Training from '../training/training.actions'
import {Store} from "@ngrx/store";


@Injectable()
export class TrainingService {
  private fbSub: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromRoot.State>) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSub.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            const data: any = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              ...data
            };
          });
        })
      ).subscribe((exercises: ExerciseModel[]) => {
        this.store.dispatch(new UI.StopLoading())
        this.store.dispatch(new Training.SetAvailableTraining(exercises))
    }, error => {
        this.store.dispatch(new UI.StopLoading())
        this.uiService.showSnackbar('Fetch failed, try later', null, 3000);
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId))
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).subscribe(exercise => {
      this.addDataToDatabase(
        {
          ...exercise,
          date: new Date(),
          state: 'completed'
        });
      this.store.dispatch(new Training.StopTraining());
    })

  }

  cancelExercise(progress) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase(
        {
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });
      this.store.dispatch(new Training.StopTraining())
    })
  }

  cancelSubscription() {
    this.fbSub.forEach(sub => sub.unsubscribe());
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSub.push(this.db.collection('finishedExercises').valueChanges()
      .pipe(take(1)).subscribe((exercises: ExerciseModel[]) => {
      this.store.dispatch(new Training.SetFinishedTraining(exercises))
    }));
  }

  private addDataToDatabase(exercise: ExerciseModel) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
