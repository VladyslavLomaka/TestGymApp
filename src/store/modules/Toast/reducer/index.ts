import {ToastAction} from '@store/modules/Toast/actions';
import {produce} from 'immer';

export interface ToastMessage {
  type?: 'success' | 'error' | 'info';
  title?: string;
  subtitle?: 'No internet' | 'Looks like something went wrong.' | string;
  position?: 'top' | 'bottom';
  show?: boolean;
}

type Actions = ReturnType<typeof ToastAction.SHOW_TOAST.STATE.create>;

const INITIAL_STATE: ToastMessage = {
  type: 'success',
};

export function toastReducer(
  state = INITIAL_STATE,
  action: Actions,
): ToastMessage {
  return produce(state, draft => {
    switch (action.type) {
      case ToastAction.SHOW_TOAST.STATE.type:
        draft.position = action.payload.position;
        draft.title = action.payload.title;
        draft.subtitle = action.payload.subtitle;
        draft.type = action.payload.type;
        draft.show = action.payload.show;
        break;
    }
  });
}
