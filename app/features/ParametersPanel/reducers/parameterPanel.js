import * as types from '../actions/types';
import * as _ from 'lodash';
const {NODE_TYPES} = types;

const initialData = {
  initialised: false,
  cursor: null,
  nSpace: null,
  newNameSpaceDialog: {
    state: 'INVALID',
    value: ''
  },
  data: {
    name: 'NameSpaces',
    toggled: true,
    children: []
  }
};

export default (state = initialData, action) => {
  switch (action.type) {
    case types.PARAMETER_PANEL_INIT:
      return state;
    case types.TOGGLE_CODE_TREE:
      const { node, toggled } = action;
      if (node.ignore) {
        return state;
      }

      const newData = _.cloneDeep(state.data);
      const cursor = _.cloneDeep(state.cursor);

      // Inactivate old node
      if (cursor) {
        _.get(newData, cursor.path).active = false;
      }

      // Activate new node
      const clonedNode = _.get(newData, node.path);
      clonedNode.active = true;
      if (clonedNode.children) {
        clonedNode.toggled = toggled;
      }

      // If open namespace close the other one
      if( clonedNode.type === NODE_TYPES.NAMESPACE
          && toggled) {
        newData
          .children
          .filter(nameSpaceNode => nameSpaceNode.name !== clonedNode.name)
          .forEach(nNode => {nNode.toggled = false;});
      }

      return _.merge(
        {},
        state,
        {
          cursor: clonedNode,
          data: newData,
          nSpace: _.get(node, 'nSpaceParent', node.name)
        }
      );

    case types.SAGA_SET_PARAMETER_PANEL_CHILDREN:
      const ret = _.cloneDeep(state);
      ret.data.children = action.data;
      return ret;
    case types.SET_NAME_SPACE_STATE:
      return _.merge(
        {},
        _.cloneDeep(state),
        {
          newNameSpaceDialog: {
            state: action.state
          }
        }
      );
    case types.SET_NEW_NAME_SPACE_VALUE:
      return _.merge(
        {},
        _.cloneDeep(state),
        {
          newNameSpaceDialog: {
            value: action.value
          }
        }
      );
    default:
      return state;
  }
};
