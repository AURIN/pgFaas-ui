import * as types from '../actions/types';
import * as _ from 'lodash';

const initialData = {
  consoleState: types.CONSOLE_STATE.NEUTRAL,
  outputCounter: 0,
  output: [],
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
    case types.REQUEST_INVOKE_FAILED:
      return _.merge(
        {},
        state,
        {
          consoleState: types.CONSOLE_STATE.FAILED
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
    case types.ADD_OUTPUT:
      return _.merge(
        {},
        state,
        {
          consoleState: types.CONSOLE_STATE.NEUTRAL,
          outputCounter: state.outputCounter + 1,
          output: [
            ...state.output,
            {
              output: action.output,
              msgType: action.msgType,
              counter: state.outputCounter + 1,
            }
          ]
        }
      );
    case types.RESET_OUTPUT:
      state.output = [];
      return _.merge({}, state);
    default:
      return state;
  }
};
