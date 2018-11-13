import { call, take, put } from 'redux-saga/effects';
import * as types from '../features/CodePanel/actions/types.js';
import { updateFunction as apiUpdateFunction } from '../lib/api/functions.js';
import { setTestCodeError } from '../features/CodePanel/actions/index.js';
import { toaster } from 'evergreen-ui';

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
        toaster.success('Function updated', { duration: 2 });
        yield put(setTestCodeError(''));
      } else {
        toaster.warngerror('Function could not be updated');
        console.warn(error);
      }
    }
  }
};

export {
  updateFunction
};

