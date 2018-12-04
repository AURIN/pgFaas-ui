import { call, take, put } from 'redux-saga/effects';
import * as types from '../features/CodePanel/actions/types.js';
import { setPanelEmpty } from '../features/CodePanel/actions/index.js';
import { deleteNamespace as deleteNamespaceCall } from '../lib/api/nameSpaces.js';
import { parameterPanelInit } from '../features/ParametersPanel/actions/index.js';
import { toaster } from 'evergreen-ui';
import {apiMessageProcessing} from './apiMessageProcessing';

const deleteNamespace = function* _deleteNamespace () {
  while (true) {
    const req = yield take(types.REQUEST_DELETE_NAMESPACE);
    const {response, error} = yield call(deleteNamespaceCall, req.nSpace);

    if (response) {
      toaster.success(apiMessageProcessing(response), { duration: 3 });
      yield put(parameterPanelInit());
      yield put(setPanelEmpty());
    } else {
      toaster.danger(apiMessageProcessing(error), { duration: 3 });
      console.warn(error);
    }
  }
};

export {
  deleteNamespace
};

