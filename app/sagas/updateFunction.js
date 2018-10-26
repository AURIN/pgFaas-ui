import { call, take } from 'redux-saga/effects';
import * as types from '../features/CodePanel/actions/types.js';
import { updateFunction as apiUpdateFunction } from '../lib/api/functions.js';
import { toaster } from 'evergreen-ui';

const updateFunction = function* _updateFunction () {
  while (true) {
    const req = yield take(types.REQUEST_UPDATE_CODE);
    const { response, error } = yield call(
      apiUpdateFunction,
      req.nSpace,
      req.fName,
      req.code
    );

    if (response) {
      toaster.success('Function updated', { duration: 2 });
    } else {
      toaster.error('Function could not be updated');
      console.warn(error);
    }
  }
};

export {
  updateFunction
};

