import { call, take, put } from 'redux-saga/effects';
import * as types from '../actions/types.js';
import {
  getNameSpaces,
  getNameSpace
} from '../../../lib/api/nameSpaces.js';
import * as _ from 'lodash';

const buildNameSpaces = () => getNameSpaces().then(nameSpaces => Promise.all(_.map(nameSpaces, getNameSpace)));

const parameterPanelInit = function* _parameterPanelInit () {
  while(true) {
    yield take(types.PARAMETER_PANEL_INIT);
    const nameSpaces = yield call(buildNameSpaces);

    // Build tree structure
    const newTreeChildren = nameSpaces.map((ns, inx) => ({
      name: ns.nameSpace,
      path: `children[${inx}]`,
      children: ns.functions.map((f, inx2) => ({
        name: f,
        path: `children[${inx}].children[${inx2}]`,
        nSpaceParent: ns.nameSpace})
      )
    }));

    yield put({
      type: types.SAGA_SET_PARAMETER_PANEL_CHILDREN,
      data: newTreeChildren
    });
  }
};

export {
  parameterPanelInit
};

