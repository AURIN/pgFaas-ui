import { call, take, put } from 'redux-saga/effects';
import * as types from '../features/CodePanel/actions/types.js';
import { setPanelEmpty } from '../features/CodePanel/actions/index.js';
import { deleteFunction as deleteFunctionCall } from '../lib/api/functions.js';
import { parameterPanelInit } from '../features/ParametersPanel/actions/index.js';
import { toaster } from 'evergreen-ui';

const deleteFunction = function* _deleteFunction () {
  while (true) {
    const req = yield take(types.REQUEST_DELETE_FUNCTION);
    const {response, error} = yield call(
      deleteFunctionCall,
      req.nSpace,
      req.fName);

    if (response) {
      toaster.success('Function deleted', { duration: 2 });
      yield put(parameterPanelInit());
      yield put(setPanelEmpty());
    } else {
      toaster.error('Function could not be deleted');
      console.warn(error);
    }
  }
};

export {
  deleteFunction
};

