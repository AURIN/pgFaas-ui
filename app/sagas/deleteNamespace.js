import { call, take, put } from 'redux-saga/effects';
import * as types from '../features/CodePanel/actions/types.js';
import { setPanelEmpty } from '../features/CodePanel/actions/index.js';
import { deleteNamespace as deleteNamespaceCall } from '../lib/api/nameSpaces.js';
import { parameterPanelInit } from '../features/ParametersPanel/actions/index.js';
import { toaster } from 'evergreen-ui';

const deleteNamespace = function* _deleteNamespace () {
  while (true) {
    const req = yield take(types.REQUEST_DELETE_NAMESPACE);
    const {response, error} = yield call(deleteNamespaceCall, req.nSpace);

    if (response) {
      toaster.success('Namespace deleted', { duration: 2 });
      yield put(parameterPanelInit());
      yield put(setPanelEmpty());
    } else {
      toaster.error('Namespace could not be deleted');
      console.warn(error);
    }
  }
};

export {
  deleteNamespace
};

