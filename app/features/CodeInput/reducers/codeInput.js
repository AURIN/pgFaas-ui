import * as types from '../actions/types';

const initialData = {
  code: '// Code'
};

export default (state = initialData, action) => {
  switch (action.type) {
    case types.SET_APP_DIMENSIONS:
      return state;
    default:
      return state;
  }
};
