import {
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
  TrainingActions
} from './training.actions'
import {ExerciseModel} from "./exercise.model";
import * as fromRoot from '../app.reducer'
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface StateTrainingReducer {
  availableExercises: ExerciseModel[],
  finishedExercises: ExerciseModel[],
  activeTraining: ExerciseModel
}

export interface State extends fromRoot.State{
  training: StateTrainingReducer
}

const initialState: StateTrainingReducer = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
}

export function TrainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        activeTraining: {...state.availableExercises.find(ex => ex.id === action.payload)}
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default: {
      return state
    }
  }
}

export const getTrainingState = createFeatureSelector<StateTrainingReducer>('training', );

export const getAvailableTrainings = createSelector(getTrainingState, (state: StateTrainingReducer) => state.availableExercises);
export const getFinishExercises = createSelector(getTrainingState, (state: StateTrainingReducer) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: StateTrainingReducer) => state.activeTraining);

export const getIsTraining = createSelector(getTrainingState, (state: StateTrainingReducer) => state.activeTraining != null);
