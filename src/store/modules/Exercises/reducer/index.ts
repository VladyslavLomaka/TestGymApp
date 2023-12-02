import {ExerciseInfo} from '@api/exercises/getExerciseInfo';
import {
  ExerciseInstance,
  ExercisesListResponse,
} from '@api/exercises/getExercisesList';
import {ExercisesActions} from '@store/modules/Exercises/actions';
import {produce} from 'immer';

export interface ExercisesState {
  exercisesList: ExercisesListResponse | null;
  selectedExercise: ExerciseInfo | null;
  filteredExercises: ExerciseInstance[] | null;
}

export type ExercisesActionType = ReturnType<
  | typeof ExercisesActions.GET_EXERCISES_LIST.SUCCESS.create
  | typeof ExercisesActions.GET_EXERCISE_INFO.SUCCESS.create
  | typeof ExercisesActions.FILTER_EXERCISES.SUCCESS.create
>;
const INITIAL_STATE: ExercisesState = {
  exercisesList: null,
  filteredExercises: null,
  selectedExercise: null,
};

function reducer(
  state = INITIAL_STATE,
  action: ExercisesActionType,
): ExercisesState {
  return produce(state, draft => {
    switch (action.type) {
      case ExercisesActions.GET_EXERCISES_LIST.SUCCESS.type:
        draft.exercisesList = action.payload;
        break;
      case ExercisesActions.GET_EXERCISE_INFO.SUCCESS.type:
        draft.selectedExercise = action.payload;
        break;
      case ExercisesActions.FILTER_EXERCISES.SUCCESS.type:
        draft.filteredExercises = action.payload;
    }
  });
}
export const exercisesReducer = reducer;
