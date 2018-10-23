import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import codeInput from  './features/CodeInput/reducers/codeInput.js';
import parameterPanel  from  './features/ParametersPanel/reducers/parameterPanel.js';

const rootReducer = combineReducers({
  routing,
  codeInput,
  parameterPanel
});

export default rootReducer;
