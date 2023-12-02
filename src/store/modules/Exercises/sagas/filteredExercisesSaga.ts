import {ExercisesActions} from '@store/modules/Exercises/actions';
import {retrieveExercises} from '@store/modules/Exercises/selectors';
import {ToastAction} from '@store/modules/Toast/actions';
import {put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = ExercisesActions.FILTER_EXERCISES.START.create;

export function* filteredExercisesSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const searchQuery = action.payload;

    const exercises: SagaReturnType<typeof retrieveExercises> = yield select(
      retrieveExercises,
    );

    if (!searchQuery && exercises) {
      yield put(
        ExercisesActions.FILTER_EXERCISES.SUCCESS.create(exercises.results),
      );
    } else {
      const regexp = new RegExp(`${searchQuery}`, 'i');

      if (exercises) {
        const filteredExercises = exercises.results.filter(
          exercise =>
            exercise.category.name.search(regexp) !== -1 ||
            exercise.equipment.some(equip => equip.name.search(regexp) !== -1),
        );

        yield put(
          ExercisesActions.FILTER_EXERCISES.SUCCESS.create(filteredExercises),
        );
      }
    }

    yield put(
      ToastAction.SHOW_TOAST.START.create({
        subtitle: 'Exercises filtered successfully',
        position: 'bottom',
        type: 'info',
        show: true,
      }),
    );
  } catch (error) {
    yield put(
      ExercisesActions.FILTER_EXERCISES.FAILED.create(
        'Exercises filtering error',
      ),
    );
    yield put(
      ToastAction.SHOW_TOAST.START.create({
        subtitle: 'Exercises filtering error, please try again later',
        position: 'top',
        type: 'error',
        show: true,
      }),
    );
    console.error(error);
  }
}
