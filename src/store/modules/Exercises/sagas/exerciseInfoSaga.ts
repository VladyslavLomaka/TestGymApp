import {Api} from '@api/index';
import {ExercisesActions} from '@store/modules/Exercises/actions';
import {ToastAction} from '@store/modules/Toast/actions';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = ExercisesActions.GET_EXERCISE_INFO.START.create;

export function* exerciseInfoSaga(action: ReturnType<typeof actionCreator>) {
  const id = action.payload;
  console.log(id);
  try {
    const exerciseInfoData: SagaReturnType<
      typeof Api.exercises.getExercisesInfo
    > = yield call(Api.exercises.getExercisesInfo, id);

    yield put(
      ExercisesActions.GET_EXERCISE_INFO.SUCCESS.create(exerciseInfoData),
    );

    console.log('exerciseInfoData', JSON.stringify(exerciseInfoData));
  } catch (e) {
    yield put(
      ExercisesActions.GET_EXERCISE_INFO.FAILED.create(
        'Exercise fetching error',
      ),
    );
    yield put(
      ToastAction.SHOW_TOAST.START.create({
        subtitle: 'Exercise fetching error, please try again later',
        position: 'top',
        type: 'error',
        show: true,
      }),
    );
    console.error(JSON.stringify(e));
  }
}
