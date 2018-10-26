import { call, take, put } from 'redux-saga/effects';
import * as types from '../features/ParametersPanel/actions/types.js';
import { toaster } from 'evergreen-ui';
import { getNameSpaces, getNameSpace } from '../lib/api/nameSpaces.js';
import * as _ from 'lodash';
import {NODE_TYPES} from '../features/ParametersPanel/actions/types.js';

const buildNameSpaces = () => getNameSpaces()
  .then(nameSpaces => Promise.all(_.map(nameSpaces, getNameSpace)))
  .then(response => ({ response }))
  .catch(error => ({ error }));

const parameterPanelInit = function* _parameterPanelInit () {
  while(true) {
    yield take(types.PARAMETER_PANEL_INIT);
    const { response: nameSpaces, error } = yield call(buildNameSpaces);

    if (nameSpaces) {
      // Build tree structure
      const newTreeChildren = nameSpaces.map((ns, inx) => ({
        name: ns.nameSpace,
        type: NODE_TYPES.NAMESPACE,
        path: `children[${inx}]`,
        children: ns.functions.map((f, inx2) => ({
          name: f,
          type: NODE_TYPES.FUNCTION,
          path: `children[${inx}].children[${inx2}]`,
          nSpaceParent: ns.nameSpace})
        )
      }));

      yield put({
        type: types.SAGA_SET_PARAMETER_PANEL_CHILDREN,
        data: newTreeChildren
      });
    } else {
      console.warn(error);
      toaster.danger('Could not load nameSpaces');
    }
  }
};

export {
  parameterPanelInit
};
