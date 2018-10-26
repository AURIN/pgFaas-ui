import * as types from './types';

const requestInvokeFunction = (nSpace, fName, params) => ({
  type: types.REQUEST_INVOKE_FUNCTION,
  nSpace,
  fName,
  params
});

export {
  requestInvokeFunction
};
