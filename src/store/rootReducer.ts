import {combineReducers} from '@reduxjs/toolkit';
import {appCommonReducer} from '@store/modules/AppCommon/reducer';

import {exercisesReducer} from './modules/Exercises/reducer';
import {toastReducer} from './modules/Toast/reducer';
import {processStatusesReducer} from './modules/UtilityProcessStatuses/reducer';

export const rootReducer = combineReducers({
  appCommon: appCommonReducer,
  exercises: exercisesReducer,
  toast: toastReducer,
  utilityProcessStatuses: processStatusesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
