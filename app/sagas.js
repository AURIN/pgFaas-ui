import { all } from 'redux-saga/effects';
import { parameterPanelInit } from './features/ParametersPanel/sagas/index.js';


export default function* rootSaga () {
  yield all([
    parameterPanelInit()
  ]);
}
