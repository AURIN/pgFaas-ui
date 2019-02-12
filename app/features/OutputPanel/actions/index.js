import * as types from './types';

const requestInvokeFunction = (nSpace, fName, test) => ({
  type: types.REQUEST_INVOKE_FUNCTION,
  nSpace,
  fName,
  test
});

const requestInvokeFailed = () => ({
  type: types.REQUEST_INVOKE_FAILED
});

const successInvokeFunction = (nSpace, fName, output) => ({
  type: types.ADD_OUTPUT,
  nSpace,
  fName,
  output,
  msgType: types.MESSAGE_TYPE.INVOKE_SUCCESS_OUTPUT
});

const failureInvokeFunction = (nSpace, fName, output) => ({
  type: types.ADD_OUTPUT,
  nSpace,
  fName,
  output,
  msgType: types.MESSAGE_TYPE.INVOKE_FAILURE_OUTPUT
});

const showErrorToUser = output => ({
  type: types.ADD_ERROR_OUTPUT,
  msgType: types.MESSAGE_TYPE.INVOKE_FAILURE_OUTPUT,
  output
});

const addOutputFailure = output => ({
  type: types.ADD_OUTPUT,
  output,
  msgType: types.MESSAGE_TYPE.INVOKE_FAILURE_OUTPUT
});

const setStateNeutral = () => ({
  type: types.SET_CONSOLE_STATE_NEUTRAL
});

const resetOutput = ()  => ({
  type: types.RESET_OUTPUT
});

export {
  addOutputFailure,
  requestInvokeFunction,
  requestInvokeFailed,
  showErrorToUser,
  successInvokeFunction,
  failureInvokeFunction,
  setStateNeutral,
  resetOutput
};
