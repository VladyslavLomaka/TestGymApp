import {RootState} from '@store/rootReducer';
import {ActionPattern, SagaReturnType, select, take} from 'redux-saga/effects';

export function* waitForSelector(
  selector: (state: RootState) => boolean,
  options: {takePattern?: ActionPattern} = {},
) {
  const {takePattern = '*'} = options;
  while (
    ((yield select(selector)) as SagaReturnType<typeof selector>) === false
  ) {
    yield take(takePattern);
  }
}
