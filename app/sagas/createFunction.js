import {call, take, put} from 'redux-saga/effects';
import * as types from '../features/CodePanel/actions/types.js';
import {createFunction as createFunctionCall} from '../lib/api/functions.js';
import {parameterPanelInit} from '../features/ParametersPanel/actions/index.js';
import {setTestCodeError} from '../features/CodePanel/actions/index.js';
import {toaster} from 'evergreen-ui';
import {addOutputFailure} from '../features/OutputPanel/actions/index.js';
import {apiMessageProcessing} from './apiMessageProcessing.js';

const createFunction = function* _createFunction () {
  while (true) {
    const action = yield take (types.REQUEST_CREATE_FUNCTION);

    let testJsonFailed = false;
    try {
      const testAsJson = JSON.parse (action.testCode);

      if (!testAsJson.verb) {
        yield put (setTestCodeError ('Must have a verb key for example: {"verb": "sub"}'));
        testJsonFailed = true;
      }
    } catch (err) {
      toaster.danger ('Could not create function');
      yield put (setTestCodeError ('Test Input was not valid JSON'));
      console.warn (err);
      testJsonFailed = true;
    }

    if (!testJsonFailed) {
      const {response, error} = yield call (
        createFunctionCall,
        action.nSpace,
        action.fName,
        action.code,
        action.testCode);

      if (response) {
        toaster.success (apiMessageProcessing (response), {duration: 3});
        yield put (parameterPanelInit ());
        yield put (setTestCodeError (''));
      } else {
        toaster.danger (apiMessageProcessing (error), {duration: 3});
        addOutputFailure (error);
        console.warn (error);
      }
    }
  }
};

export {
  createFunction
};

