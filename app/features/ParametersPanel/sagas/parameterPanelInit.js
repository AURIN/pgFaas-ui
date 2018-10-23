import { call, take, put } from 'redux-saga/effects';
import * as types from '../actions/types.js';
import {
  getNameSpaces,
  getNameSpace
} from '../../../lib/api/nameSpaces.js';

const buildNameSpaces = () => {
  return getNameSpaces()
    .then(nameSpaces => Promise.all(
      nameSpaces.map(ns => getNameSpace(ns))
    ));
};

const parameterPanelInit = function* _parameterPanelInit () {
  yield take(types.PARAMETER_PANEL_INIT);
  const nameSpaces = yield call(buildNameSpaces);

  // Build tree structure
  const newTreeChildren = nameSpaces.map(ns => {
    return {
      name: ns.nameSpace,
      children: ns.functions.map(f => {
        return { name: f };
      })
    };
  });

  yield put({
    type: types.SAGA_SET_PARAMETER_PANEL_CHILDREN,
    data: newTreeChildren
  });
};

export {
  parameterPanelInit
};

