import {Api} from '@api/index';
import {ExercisesActions} from '@store/modules/Exercises/actions';
import {ToastAction} from '@store/modules/Toast/actions';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* exercisesListSaga() {
  try {
    const exercisesData: SagaReturnType<typeof Api.exercises.getExercisesList> =
      yield call(Api.exercises.getExercisesList);
    console.log('exercisesData', exercisesData);

    yield put(
      ExercisesActions.GET_EXERCISES_LIST.SUCCESS.create(exercisesData),
    );

    yield put(
      ExercisesActions.FILTER_EXERCISES.SUCCESS.create(exercisesData.results),
    );
  } catch (error) {
    console.error('error', error);
    yield put(
      ExercisesActions.GET_EXERCISES_LIST.FAILED.create(
        'Exercises fetching error',
      ),
    );
    yield put(
      ToastAction.SHOW_TOAST.START.create({
        subtitle: 'Exercises fetching error, please try again later',
        position: 'top',
        type: 'error',
        show: true,
      }),
    );
  }
}
