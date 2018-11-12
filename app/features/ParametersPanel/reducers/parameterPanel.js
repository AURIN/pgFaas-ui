import * as types from '../actions/types';
import * as _ from 'lodash';
const {NODE_TYPES, TABLE_NODE_TYPES, PARAMETER_TYPES} = types;

const initialData = {
  initialised: false,
  cursor: null,
  dbCursor: null,
  nSpace: null,
  selectedParameter: PARAMETER_TYPES.LOADING,
  newNameSpaceDialog: {
    state: 'INVALID',
    value: ''
  },
  data: {
    name: 'NameSpaces',
    toggled: true,
    children: []
  },
  dbData: {
    name: 'Database',
    toggled: true,
    children: []
  }
};

function handleToggleDbTree (state, action) {
  const { node, toggled } = action;
  if (node.ignore) { return state; }

  const newData = _.cloneDeep(state.dbData);
  const cursor = _.cloneDeep(state.dbCursor);

  // Inactivate old node
  if (cursor && _.get(newData, cursor.path + '.active') !== undefined) {
    _.get(newData, cursor.path).active = false;
  }

  // Activate new node
  const clonedNode = _.get(newData, node.path);
  clonedNode.active = true;
  if (clonedNode.children) {
    clonedNode.toggled = toggled;
  }

  // If open namespace close the other one
  if( clonedNode.type === TABLE_NODE_TYPES.TABLE
      && toggled) {
    newData
      .children
      .filter(tableNode => tableNode.name !== clonedNode.name)
      .forEach(nNode => {nNode.toggled = false;});
  }

  return _.merge(
    {},
    state,
    {
      dbCursor: clonedNode,
      dbData: newData
    }
  );
}

export default (state = initialData, action) => {
  switch (action.type) {
    case types.PARAMETER_PANEL_INIT:
      return state;
    case types.TOGGLE_DB_TREE:
      return handleToggleDbTree(state, action);
    case types.TOGGLE_CODE_TREE:
      const { node, toggled } = action;
      if (node.ignore) {
        return state;
      }

      const newData = _.cloneDeep(state.data);
      const cursor = _.cloneDeep(state.cursor);

      // Inactivate old node
      if (cursor && _.get(newData, cursor.path + '.active') !== undefined) {
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
    case types.SET_SELECTED_PARAMETER_DB:
      return _.merge(
        {},
        state,
        {
          selectedParameter: PARAMETER_TYPES.DATABASES
        }
      );
    case types.SET_SELECTED_PARAMETER_NS_FUNC:
      return _.merge(
        {},
        state,
        {
          selectedParameter: PARAMETER_TYPES.NS_FUNC
        }
      );
    case types.SET_SELECTED_PARAMETER_LOADING:
      return _.merge(
        {},
        state,
        {
          selectedParameter: PARAMETER_TYPES.LOADING
        }
      );
    case types.SAGA_SET_NS_CHILDREN:
      const ret = _.cloneDeep(state);
      ret.data.children = action.data;
      return ret;
    case types.SAGA_SET_DB_CHILDREN:
      const dbStateClone = _.cloneDeep(state);
      dbStateClone.dbData.children = action.data;
      return dbStateClone;
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
