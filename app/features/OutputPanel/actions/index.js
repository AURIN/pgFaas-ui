import * as types from './types';

const requestInvokeFunction = (nSpace, fName, params) => ({
  type: types.REQUEST_INVOKE_FUNCTION,
  nSpace,
  fName,
  params
});

const requestInvokeFailed = () => ({
  type: types.REQUEST_INVOKE_FAILED
});

const successInvokeFunction = (nSpace, fName, output) => ({
  type: types.SUCCESSS_INVOKE_FUNCTION,
  nSpace,
  fName,
  output
});

const setStateNeutral = () => ({
  type: types.SET_CONSOLE_STATE_NEUTRAL
});

const resetOutput = ()  => ({
  type: types.RESET_OUTPUT
});

export {
  requestInvokeFunction,
  requestInvokeFailed,
  successInvokeFunction,
  setStateNeutral,
  resetOutput
};
