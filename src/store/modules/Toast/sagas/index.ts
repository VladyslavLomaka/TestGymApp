import {ToastAction} from '@store/modules/Toast/actions';
import {showToastSaga} from '@store/modules/Toast/sagas/showToastSaga';
import {all, takeLatest} from 'redux-saga/effects';

export function* rootToastSaga() {
  yield all([takeLatest(ToastAction.SHOW_TOAST.START.type, showToastSaga)]);
}
