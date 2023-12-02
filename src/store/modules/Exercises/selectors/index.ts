import {RootState} from '@store/rootReducer';

export const retrieveExercises = (state: RootState) =>
  state.exercises.exercisesList;

export const retrieveExerciseInfo = (state: RootState) =>
  state.exercises.selectedExercise;

export const retrieveFilteredExercises = (state: RootState) =>
  state.exercises.filteredExercises;
