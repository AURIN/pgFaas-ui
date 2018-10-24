import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import parameterPanel  from  './features/ParametersPanel/reducers/parameterPanel.js';
import codePanel from  './features/CodePanel/reducers/codePanel.js';

const rootReducer = combineReducers({
  routing,
  parameterPanel,
  codePanel
});

export default rootReducer;
