import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import parameterPanel  from  './features/ParametersPanel/reducers/parameterPanel.js';
import codePanel from  './features/CodePanel/reducers/codePanel.js';
import functOutput from './features/OutputPanel/reducers/functOutput.js';

const rootReducer = combineReducers({
  routing,
  parameterPanel,
  codePanel,
  functOutput
});

export default rootReducer;
