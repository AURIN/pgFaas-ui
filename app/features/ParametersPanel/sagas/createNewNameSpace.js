import { call, take, put }  from 'redux-saga/effects';
import * as types from '../actions/types.js';
import { createNameSpace } from '../../../lib/api/nameSpaces.js';
import { toaster } from 'evergreen-ui';
import {
  setCreateNameSpaceStatePending,
  setCreateNameSpaceStateInvalid,
  parameterPanelInit
} from '../actions/index.js';

const createNewNameSpace = function* _createNewNameSpace () {
  while (true) {
    const action = yield take(types.CREATE_NEW_NAME_SPACE_REQEUST);
    yield put(setCreateNameSpaceStatePending());

    const { response, error } = yield call(createNameSpace, action.newNameSpace);
    if (response) {
      toaster.success('Namespace created', { duration: 2 });
    } else {
      toaster.error('Namespace could not be saved');
      console.warn(error);
    }

    yield put(setCreateNameSpaceStateInvalid());
    yield put(parameterPanelInit());
  }
};

export {
  createNewNameSpace
};

