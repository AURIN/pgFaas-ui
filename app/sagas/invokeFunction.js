import { take, call, put } from 'redux-saga/effects';
import { invokeFunction as invokeFunctionCall } from '../lib/api/functions.js';
import * as types from '../features/OutputPanel/actions/types.js';
import { successInvokeFunction, requestInvokeFailed } from '../features/OutputPanel/actions/index.js';
import { setTestCodeError } from '../features/CodePanel/actions/index.js';
import { toaster } from 'evergreen-ui';

const invokeFunction = function* _invokeFunction () {
  while (true) {
    const action = yield take(types.REQUEST_INVOKE_FUNCTION);

    try {
      const testAsJson = JSON.parse(action.params);

      if (!testAsJson.verb) {
        yield put(setTestCodeError('Must have a verb key'));
        throw new Error('Must have a verb key');
      }

      const {response, error} = yield call(
        invokeFunctionCall,
        action.nSpace,
        action.fName,
        testAsJson
      );

      if (response) {
        yield put(successInvokeFunction(
          action.nSpace,
          action.fName,
          response
        ));
        yield put(setTestCodeError(''));
      } else {
        toaster.danger('Could not invoke function');
        yield put(requestInvokeFailed());
        console.warn(error);
      }
    } catch(err) {
      toaster.danger('Could not invoke function');
      yield put(setTestCodeError('Test Input was not valid JSON'));
      yield put(requestInvokeFailed());
      console.warn(err);
    }
  }
};

export {
  invokeFunction
};

