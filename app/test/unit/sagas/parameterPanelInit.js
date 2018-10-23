import * as NameSpaces from '../../../lib/api/nameSpaces.js';
import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { parameterPanelInit } from '../../../features/ParametersPanel/sagas/index.js';
import sinon from 'sinon';
import * as types from '../../../features/ParametersPanel/actions/types.js';

test('parameterPanelInit', () => {
  sinon.stub(NameSpaces, 'getNameSpaces').callsFake(() => {
    return Promise.resolve(['space1', 'space2']);
  });

  sinon.stub(NameSpaces, 'getNameSpace').callsFake((name) => {
    return {
      nameSpace: name,
      functions: ['f1', 'f2']
    };
  });

  return expectSaga(parameterPanelInit)
    .dispatch({
      type: types.PARAMETER_PANEL_INIT,
    })
    .put({
      type: types.SAGA_SET_PARAMETER_PANEL_CHILDREN,
      data: [
        {name: 'space1', children: [{name: 'f1'}, {name: 'f2'}]},
        {name: 'space2', children: [{name: 'f1'}, {name: 'f2'}]}
      ]
    })
    .run();
});
