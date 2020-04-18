import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExerciseModel} from '../exercise.model';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: ExerciseModel[];
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit(): void {

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

}
