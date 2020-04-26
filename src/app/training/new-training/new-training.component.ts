import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExerciseModel} from '../exercise.model';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {UiService} from "../../shared/ui.service";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: ExerciseModel[];
  private alive = true;

  constructor(private trainingService: TrainingService, private uiService: UiService) {
  }

  isLoading = true;

  ngOnInit(): void {
    this.uiService.loadingStateChanged
      .pipe(
        takeWhile(() => this.alive)
      ).subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.trainingService.exercisesChanged
      .pipe(
        takeWhile(() => this.alive)
      ).subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
