import {ExerciseModel} from './exercise.model';
import {Subject, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<ExerciseModel>();
  exercisesChanged = new Subject<ExerciseModel[]>();
  finishedExercisesChanged = new Subject<ExerciseModel[]>();
  private availableExercises: ExerciseModel[] = [];
  private runningExercise: ExerciseModel;
  private fbSub: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
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
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
    }));
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase(
      {
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress) {
    this.addDataToDatabase(
      {
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelSubscription() {
    this.fbSub.forEach(sub => sub.unsubscribe());
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSub.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: ExerciseModel[]) => {
      this.finishedExercisesChanged.next(exercises);
    }));
  }

  private addDataToDatabase(exercise: ExerciseModel) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
