import { call, take, put } from 'redux-saga/effects';
import * as types from '../actions/types.js';
import { getFunction } from '../../../lib/api/functions.js';

const showFunction = function* _showFunction () {
  while (true) {
    const req = yield take(types.SHOW_FUNCTION_REQUEST);
    const fDet = yield call(getFunction, req.nSpace, req.fName);
    yield put({
      type: types.SAGA_SHOW_FUNCTION_SET_CODE_PANEL,
      nSpace: fDet.nSpace,
      fName: fDet.fName,
      code: fDet.code
    });
  }
};

export {
  showFunction
};

