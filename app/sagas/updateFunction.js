import { call, take, put } from 'redux-saga/effects';
import * as types from '../features/CodePanel/actions/types.js';
import { updateFunction as apiUpdateFunction } from '../lib/api/functions.js';
import { setTestCodeError } from '../features/CodePanel/actions/index.js';
import { toaster } from 'evergreen-ui';
import {apiMessageProcessing} from './apiMessageProcessing';
import {
  showErrorToUser,
} from '../features/OutputPanel/actions/index.js';

const updateFunction = function* _updateFunction () {
  while (true) {
    const action = yield take(types.REQUEST_UPDATE_CODE);

    let testJsonFailed = false;
    try {
      const testAsJson = JSON.parse(action.test);

      if (!testAsJson.verb) {
        yield put(setTestCodeError('Must have a verb key for example: {"verb": "sub"}'));
        testJsonFailed = true;
      }
    } catch(err) {
      toaster.danger('Could not update function');
      yield put(setTestCodeError('Test Input was not valid JSON'));
      console.warn(err);
    }

    if (!testJsonFailed) {
      const { response, error } = yield call(
        apiUpdateFunction,
        action.nSpace,
        action.fName,
        action.code,
        action.test
      );

      if (response) {
        toaster.success(apiMessageProcessing(response), { duration: 3 });
        yield put(setTestCodeError(''));
      } else {
        toaster.danger(apiMessageProcessing(error), { duration: 3 });
        if (typeof error === 'string') {
          yield put(showErrorToUser(error));
        }
        console.warn(error);
      }
    }
  }
};

export {
  updateFunction
};

