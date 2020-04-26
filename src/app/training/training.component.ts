import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from './training.service';
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining = false;
  private alive = true;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.exerciseChanged
      .pipe(
        takeWhile(() => this.alive)
      ).subscribe(exercise => {
      this.onGoingTraining = !!exercise;
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
