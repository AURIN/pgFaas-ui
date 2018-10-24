import * as types from './types';

const showFunctionRequest = (nSpace, fName) => ({
  type: types.SHOW_FUNCTION_REQUEST,
  nSpace,
  fName
});

const updateCode = code => ({
  type: types.SET_STORE_CODE,
  code
});

const requestUpdateCode = (nSpace, fName, code) => ({
  type: types.REQUEST_UPDATE_CODE,
  nSpace,
  fName,
  code
});

export {
  showFunctionRequest,
  updateCode,
  requestUpdateCode
};
