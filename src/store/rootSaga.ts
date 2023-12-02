import {rootAppCommonSaga} from '@store/modules/AppCommon/sagas';
import {rootExercisesSaga} from '@store/modules/Exercises/sagas';
import {SagaIterator} from 'redux-saga';
import {all, call, cancel, spawn} from 'redux-saga/effects';

import {rootToastSaga} from './modules/Toast/sagas';

export function* rootSaga(): SagaIterator {
  const sagas = [rootAppCommonSaga, rootExercisesSaga, rootToastSaga];

  const spawnedSagas = yield all([
    ...sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {
            console.log('Root Saga Error', error);
          }
        }
      }),
    ),
  ]);

  yield cancel(spawnedSagas);
  yield call(rootSaga);
}
