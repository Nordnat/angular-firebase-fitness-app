import {Component, OnInit} from '@angular/core';
import {ExerciseModel} from '../exercise.model';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {UiService} from "../../shared/ui.service";
import * as fromTraining from "../../training/training.reducer";
import * as fromRoot from "../../app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<ExerciseModel[]>;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private uiService: UiService, private store: Store<fromTraining.State>) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableTrainings);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
