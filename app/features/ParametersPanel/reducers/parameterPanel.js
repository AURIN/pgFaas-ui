import * as types from '../actions/types';
import * as _ from 'lodash';

const initialData = {
  initialised: false,
  data: {
    name: 'root',
    toggled: true,
    children: []
  }
};

export default (state = initialData, action) => {
  switch (action.type) {
    case types.PARAMETER_PANEL_INIT:
      return state;
    case types.SAGA_SET_PARAMETER_PANEL_CHILDREN:
      return _.merge(
        {},
        state,
        {
          data: {
            children: action.data
          }
        }
      );
    default:
      return state;
  }
};
