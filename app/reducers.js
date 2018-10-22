import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import codeInput from  './features/CodeInput/reducers/codeInput.js';

const rootReducer = combineReducers({
  routing,
  codeInput
});

export default rootReducer;
