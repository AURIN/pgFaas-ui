import { call, take, put } from 'redux-saga/effects';
import * as types from '../features/CodePanel/actions/types.js';
import { createFunction as createFunctionCall } from '../lib/api/functions.js';
import { parameterPanelInit } from '../features/ParametersPanel/actions/index.js';
import { setTestCodeError } from '../features/CodePanel/actions/index.js';
import { toaster } from 'evergreen-ui';

const createFunction = function* _createFunction () {
  while (true) {
    const req = yield take(types.REQUEST_CREATE_FUNCTION);

    let testJsonFailed = false;
    try {
      const testAsJson = JSON.parse(req.testCode);

      if (!testAsJson.verb) {
        yield put(setTestCodeError('Must have a verb key for example: {"verb": "sub"}'));
        testJsonFailed = true;
      }
    } catch(err) {
      toaster.danger('Could not create function');
      yield put(setTestCodeError('Test Input was not valid JSON'));
      console.warn(err);
      testJsonFailed = true;
    }

    if (!testJsonFailed) {
      const {response, error} = yield call(
        createFunctionCall,
        req.nSpace,
        req.fName,
        req.code,
        req.testCode);

      if (response) {
        toaster.success('Function created', { duration: 2 });
        yield put(parameterPanelInit());
        yield put(setTestCodeError(''));
      } else {
        toaster.danger('Function could not be created');
        console.warn(error);
      }
    }
  }
};

export {
  createFunction
};

