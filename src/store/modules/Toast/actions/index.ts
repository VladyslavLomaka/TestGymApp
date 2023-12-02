import {createAction} from '@store/utils/actions/createAction';

const SHOW_TOAST = createAction('SHOW_TOAST', {
  START: ({
    title,
    subtitle,
    show,
    position,
    type,
  }: {
    title?: string;
    subtitle?: 'No internet' | 'Looks like something went wrong.' | string;
    position?: 'top' | 'bottom';
    show: boolean;
    type?: 'success' | 'error' | 'info';
  }) => ({title, subtitle, position, show, type}),
  STATE: (
    show: boolean,
    title?: string,
    subtitle?: string,
    position?: 'top' | 'bottom',
    type?: 'success' | 'error' | 'info',
  ) => ({show, title, subtitle, position, type}),
});

export const ToastAction = Object.freeze({
  SHOW_TOAST,
});
