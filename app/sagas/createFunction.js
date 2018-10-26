import { call, take, put } from 'redux-saga/effects';
import * as types from '../features/CodePanel/actions/types.js';
import { createFunction as createFunctionCall } from '../lib/api/functions.js';
import { parameterPanelInit } from '../features/ParametersPanel/actions/index.js';
import { toaster } from 'evergreen-ui';

const createFunction = function* _createFunction () {
  while (true) {
    const req = yield take(types.REQUEST_CREATE_FUNCTION);
    const {response, error} = yield call(
      createFunctionCall,
      req.nSpace,
      req.fName,
      req.code,
      req.testCode);

    if (response) {
      toaster.success('Function created', { duration: 2 });
      yield put(parameterPanelInit());
    } else {
      toaster.error('Function could not be created');
      console.warn(error);
    }
  }
};

export {
  createFunction
};

