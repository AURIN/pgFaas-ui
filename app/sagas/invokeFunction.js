import { take } from 'redux-saga/effects';
import * as types from '../features/OutputPanel/actions/types.js';

const invokeFunction = function* _invokeFunction () {
  while (true) {
    const req = yield take(types.REQUEST_INVOKE_FUNCTION);
    console.warn('IN SAGA', req);
  }
};

export {
  invokeFunction
};

