import {ToastAction} from '@store/modules/Toast/actions';
import {put} from 'redux-saga/effects';

const actionCreator = ToastAction.SHOW_TOAST.START.create;

export function* showToastSaga(action: ReturnType<typeof actionCreator>) {
  const {show, title, subtitle, position, type} = action.payload;
  yield put(
    ToastAction.SHOW_TOAST.STATE.create(show, title, subtitle, position, type),
  );
}
