import { take, call, put } from 'redux-saga/effects';
import { invokeFunction as invokeFunctionCall } from '../lib/api/functions.js';
import * as types from '../features/OutputPanel/actions/types.js';
import { successInvokeFunction } from '../features/OutputPanel/actions/index.js';
import { toaster } from 'evergreen-ui';

const invokeFunction = function* _invokeFunction () {
  while (true) {
    const action = yield take(types.REQUEST_INVOKE_FUNCTION);

    const {response, error} = yield call(
      invokeFunctionCall,
      action.nSpace,
      action.fName,
      action.params
    );

    if (response) {
      yield put(successInvokeFunction(
        action.nSpace,
        action.fName,
        response.message
      ));
    } else {
      toaster.danger('Could not invoke function');
      console.warn(error);
    }
  }
};

export {
  invokeFunction
};

