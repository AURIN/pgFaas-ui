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

const updateTestCode = code => ({
  type: types.SET_TEST_CODE,
  code
});

const requestUpdateCode = (nSpace, fName, code) => ({
  type: types.REQUEST_UPDATE_CODE,
  nSpace,
  fName,
  code
});

const requestCreateFunction = (nSpace, fName, code, testCode) => ({
  type: types.REQUEST_CREATE_FUNCTION,
  nSpace,
  fName,
  code,
  testCode
});

export {
  showFunctionRequest,
  updateCode,
  updateTestCode,
  requestUpdateCode,
  requestCreateFunction
};
