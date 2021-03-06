import * as types from '../actions/types';
import * as paramPaneltypes from '../../ParametersPanel/actions/types.js';
import * as _ from 'lodash';
import { NODE_TYPES } from '../../ParametersPanel/actions/types.js';

const initialData = {
  nodeVariant: NODE_TYPES.EMPTY,
  nSpace: null,
  fName: null,
  code: '// ',
  testInput: '// ',
  testCodeError: ''
};

export default (state = initialData, action) => {
  switch (action.type) {
    case  types.SHOW_NEW_FUNCTION:
      return _.merge(
        {},
        state,
        {
          nSpace: action.nSpace,
          fName: null,
          nodeVariant: NODE_TYPES.NEW_FUNCTION,
          code: '// ',
          testInput: '// ',
          testCodeError: ''
        }
      );
    case paramPaneltypes.TOGGLE_CODE_TREE:
      return _.merge(
        {},
        state,
        {
          nodeVariant: action.nodeVariant,
          nSpace: action.nSpace,
          code: action.nodeVariant === NODE_TYPES.NAMESPACE ? '// ' : state.code,
          testInput: action.nodeVariant === NODE_TYPES.NAMESPACE ? '// ' : state.testInput,
          testCodeError: ''
        }
      );
    case types.SAGA_SHOW_FUNCTION_SET_CODE_PANEL:
      return _.merge(
        {},
        state,
        {
          nSpace: action.nSpace,
          fName: action.fName,
          code: action.code,
          testInput: action.testInput,
          testCodeError: ''
        }
      );
    case types.SET_STORE_CODE:
      return _.merge(
        {},
        state,
        {
          code: action.code
        }
      );
    case types.SET_PANEL_EMPTY:
      return _.merge(
        {},
        state,
        {
          nodeVariant: NODE_TYPES.EMPTY,
          nSpace: null,
          fName: null,
          code: '// ',
          testInput: '// ',
          testCodeError: ''
        }
      );
    case types.SET_TEST_CODE:
      return _.merge(
        {},
        state,
        {
          testInput: action.code
        }
      );
    case types.SET_TEST_CODE_ERROR:
      return _.merge(
        {},
        state,
        {
          testCodeError: action.value
        }
      );
    default:
      return state;
  }
};
