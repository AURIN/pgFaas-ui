import {take, call, put} from 'redux-saga/effects';
import {invokeFunction as invokeFunctionCall} from '../lib/api/functions.js';
import * as types from '../features/OutputPanel/actions/types.js';
import {
  successInvokeFunction,
  failureInvokeFunction,
  requestInvokeFailed
} from '../features/OutputPanel/actions/index.js';
import {setTestCodeError} from '../features/CodePanel/actions/index.js';
import {toaster} from 'evergreen-ui';
import {apiMessageProcessing} from './apiMessageProcessing';

const invokeFunction = function* _invokeFunction () {
  while (true) {
    const action = yield take (types.REQUEST_INVOKE_FUNCTION);

    let testJsonFailed = false;
    try {
      const testAsJson = JSON.parse (action.test);

      if (!testAsJson.verb) {
        yield put (setTestCodeError ('Must have a verb key for example: {"verb": "sub"}'));
        testJsonFailed = true;
      }
    } catch (err) {
      toaster.danger ('Could not invoke function: ' + apiMessageProcessing (err));
      yield put (setTestCodeError ('Test Input was not valid JSON'));
      yield put (requestInvokeFailed ());
      console.warn (err);
    }

    if (!testJsonFailed) {
      yield put (setTestCodeError (''));

      const {response, error} = yield call (
        invokeFunctionCall,
        action.nSpace,
        action.fName,
        action.test
      );

      if (response) {
        toaster.success ('Function execution completed', {duration: 3});
        let responseText = null;
        try {
          responseText = JSON.stringify (JSON.parse (response), null, 4);
        } catch (err) {
          responseText = response;
        }

        yield put (successInvokeFunction (
          action.nSpace,
          action.fName,
          responseText
        ));
      } else {
        toaster.danger ('Function execution error: ' + error.message);
        yield put (failureInvokeFunction (
          action.space,
          action.fName,
          error.message
        ));
        yield put (requestInvokeFailed ());
      }
    }
  }
};

export {
  invokeFunction
};

