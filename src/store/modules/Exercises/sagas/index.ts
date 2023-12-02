import {ExercisesActions} from '@store/modules/Exercises/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {exerciseInfoSaga} from './exerciseInfoSaga';
import {exercisesListSaga} from './exercisesListSaga';
import {filteredExercisesSaga} from './filteredExercisesSaga';

export function* rootExercisesSaga() {
  yield all([
    takeLatest(
      ExercisesActions.GET_EXERCISES_LIST.START.type,
      exercisesListSaga,
    ),
    takeLatest(ExercisesActions.GET_EXERCISE_INFO.START.type, exerciseInfoSaga),
    takeLatest(
      ExercisesActions.FILTER_EXERCISES.START.type,
      filteredExercisesSaga,
    ),
  ]);
}
