import { call, take, put } from 'redux-saga/effects';
import * as types from '../features/CodePanel/actions/types.js';
import { toaster } from 'evergreen-ui';
import { getFunction } from '../lib/api/functions.js';
import { setPanelEmpty } from '../features/CodePanel/actions/index.js';

const showFunction = function* _showFunction () {
  while (true) {
    const req = yield take(types.SHOW_FUNCTION_REQUEST);
    const {response, error} = yield call(getFunction, req.nSpace, req.fName);

    if (response) {
      yield put({
        type: types.SAGA_SHOW_FUNCTION_SET_CODE_PANEL,
        nSpace: response.nSpace,
        fName: response.fName,
        code: response.code,
        testInput: response.testInput
      });
    } else {
      console.warn(error);
      toaster.danger('Could not get function');
      yield put(setPanelEmpty());
    }
  }
};

export {
  showFunction
};

