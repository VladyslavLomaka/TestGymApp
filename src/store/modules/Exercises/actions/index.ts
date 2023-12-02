import {ExerciseInfo} from '@api/exercises/getExerciseInfo';
import {
  ExerciseInstance,
  ExercisesListResponse,
} from '@api/exercises/getExercisesList';
import {createAction} from '@store/utils/actions/createAction';

const GET_EXERCISES_LIST = createAction('GET_EXERCISES_LIST', {
  START: () => {},
  SUCCESS: (exercisesList: ExercisesListResponse) => exercisesList,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const GET_EXERCISE_INFO = createAction('GET_EXERCISE_INFO', {
  START: (id: number) => id,
  SUCCESS: (exercisesList: ExerciseInfo) => exercisesList,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const FILTER_EXERCISES = createAction('FILTER_EXERCISES', {
  START: (query: string) => query,
  SUCCESS: (exercisesList: ExerciseInstance[]) => exercisesList,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const ExercisesActions = Object.freeze({
  GET_EXERCISES_LIST,
  GET_EXERCISE_INFO,
  FILTER_EXERCISES,
});
