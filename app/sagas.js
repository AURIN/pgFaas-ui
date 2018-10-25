import { all } from 'redux-saga/effects';
import { parameterPanelInit, createNewNameSpace } from './features/ParametersPanel/sagas/index.js';
import {
  showFunction,
  updateFunction,
  createFunction
} from './features/CodePanel/sagas/index.js';

export default function* rootSaga () {
  yield all([
    createNewNameSpace(),
    parameterPanelInit(),
    showFunction(),
    updateFunction(),
    createFunction()
  ]);
}
