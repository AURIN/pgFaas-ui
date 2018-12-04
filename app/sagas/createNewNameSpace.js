import { call, take, put }  from 'redux-saga/effects';
import * as types from '../features/ParametersPanel/actions/types.js';
import { createNameSpace } from '../lib/api/nameSpaces.js';
import { toaster } from 'evergreen-ui';
import {
  setCreateNameSpaceStatePending,
  setCreateNameSpaceStateInvalid,
  parameterPanelInit
} from '../features/ParametersPanel/actions/index.js';
import {apiMessageProcessing} from './apiMessageProcessing';

const createNewNameSpace = function* _createNewNameSpace () {
  while (true) {
    const action = yield take(types.CREATE_NEW_NAME_SPACE_REQEUST);
    yield put(setCreateNameSpaceStatePending());

    const { response, error } = yield call(createNameSpace, action.newNameSpace);
    if (response) {
      toaster.success(apiMessageProcessing(response), { duration: 3 });
    } else {
      toaster.danger(apiMessageProcessing(error), { duration: 3 });
      console.warn(error);
    }

    yield put(setCreateNameSpaceStateInvalid());
    yield put(parameterPanelInit());
  }
};

export {
  createNewNameSpace
};

