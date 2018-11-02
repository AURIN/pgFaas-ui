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

const requestDeleteFunction = (nSpace, fName) => ({
  type: types.REQUEST_DELETE_FUNCTION,
  nSpace,
  fName
});

const requestDeleteNamespace = (nSpace) => ({
  type: types.REQUEST_DELETE_NAMESPACE,
  nSpace
});

const setPanelEmpty = () => ({
  type: types.SET_PANEL_EMPTY
});

const setTestCodeError = value => ({
  type: types.SET_TEST_CODE_ERROR,
  value
});

const showNewFunction = (nSpace) => ({
  type: types.SHOW_NEW_FUNCTION,
  nSpace
});

export {
  updateCode,
  updateTestCode,
  requestUpdateCode,
  requestCreateFunction,
  requestDeleteFunction,
  requestDeleteNamespace,
  showFunctionRequest,
  setPanelEmpty,
  setTestCodeError,
  showNewFunction
};
