import * as types from '../actions/types';
import * as _ from 'lodash';

const initialData = {
  consoleState: types.CONSOLE_STATE.NEUTRAL,
  output: '',
};

export default (state = initialData, action) => {
  switch (action.type) {
    case types.REQUEST_INVOKE_FUNCTION:
      return _.merge(
        {},
        state,
        {
          consoleState: types.CONSOLE_STATE.PENDING
        }
      );
    case types.SET_CONSOLE_STATE_NEUTRAL:
      return _.merge(
        {},
        state,
        {
          consoleState: types.CONSOLE_STATE.NEUTRAL,
        }
      );
    case types.SUCCESSS_INVOKE_FUNCTION:
      return _.merge(
        {},
        state,
        {
          consoleState: types.CONSOLE_STATE.NEUTRAL,
          output: action.output
        }
      );
    case types.RESET_OUTPUT:
      return _.merge(
        {},
        state,
        {
          output: ''
        }
      );
    default:
      return state;
  }
};