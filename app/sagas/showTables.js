import { call, take, put } from 'redux-saga/effects';
import * as types from '../features/ParametersPanel/actions/types.js';
import { toaster } from 'evergreen-ui';
import { getTables,  getTable} from '../lib/api/tables.js';
import * as _ from 'lodash';
import {TABLE_NODE_TYPES} from '../features/ParametersPanel/actions/types.js';

const buildTables = () => getTables()
  .then(tables => Promise.all(_.map(tables, getTable)))
  .then(response => ({ response }))
  .catch(error => ({ error }));

const showTables = function* _showTables () {
  while(true) {
    yield take(types.REQUEST_SHOW_DB_PARAMETER);
    yield put({ type: types.SET_SELECTED_PARAMETER_LOADING });
    const { response: tables, error } = yield call(buildTables);

    if (tables) {
      // Build tree structure
      const newTreeChildren = tables.map((t, inx) => ({
        name: t.table,
        type: TABLE_NODE_TYPES.TABLE,
        path: `children[${inx}]`,
        children: t.columns.map((f, inx2) => ({
          name: f,
          type: TABLE_NODE_TYPES.COLUMN,
          path: `children[${inx}].children[${inx2}]`,
          nTableParent: t.table})
        )
      }));

      yield put({ type: types.SAGA_SET_DB_CHILDREN, data: newTreeChildren });
      yield put({ type: types.SET_SELECTED_PARAMETER_DB});
    } else {
      console.warn(error);
      yield put({ type: types.SET_SELECTED_PARAMETER_DB, dbData: [] });
      toaster.danger('Could not load tables');
    }
  }
};

export {
  showTables
};

