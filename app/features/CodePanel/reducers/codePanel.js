import * as types from '../actions/types';
import * as _ from 'lodash';

const initialData = {
  nSpace: null,
  fName: null,
  code: '// Code'
};

export default (state = initialData, action) => {
  switch (action.type) {
    case types.SAGA_SHOW_FUNCTION_SET_CODE_PANEL:
      return _.merge(
        {},
        state,
        {
          nSpace: action.nSpace,
          fName: action.fName,
          code: action.code
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
    default:
      return state;
  }
};
