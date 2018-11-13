import * as types from './types';
import { NODE_TYPES, TABLE_NODE_TYPES } from '../actions/types.js';

const parameterPanelInit = () => ({ type: types.PARAMETER_PANEL_INIT });
const toggleCodeNode = (node, toggled, nodeVariant) => ({
  type: types.TOGGLE_CODE_TREE,
  nSpace: node.variant === NODE_TYPES.NAMESPACE ?  node.name : node.nSpaceParent,
  node,
  toggled,
  nodeVariant
});
const createNewNameSpace = (newNameSpace) => ({
  type: types.CREATE_NEW_NAME_SPACE_REQEUST,
  newNameSpace
});

const toggleDbNode = (node, toggled, nodeVariant) => ({
  type: types.TOGGLE_DB_TREE,
  nTable: node.variant === TABLE_NODE_TYPES.TABLE ?  node.name : node.nTableParent,
  node,
  toggled,
  nodeVariant
});

const setNewNameSpaceValue = value => ({type: types.SET_NEW_NAME_SPACE_VALUE, value});
const setCreateNameSpaceStateInvalid = () => ({type: types.SET_NAME_SPACE_STATE, state: types.NAMESPACE_STATES.INVALID});
const setCreateNameSpaceStatePending = () => ({type: types.SET_NAME_SPACE_STATE, state: types.NAMESPACE_STATES.PENDING});
const setCreateNameSpaceStateCreated = () => ({type: types.SET_NAME_SPACE_STATE, state: types.NAMESPACE_STATES.CREATED});

const showNameSpacePanel = () => ({type: types.SET_SELECTED_PARAMETER_NS_FUNC});
const showDbPanel = () => ({type: types.REQUEST_SHOW_DB_PARAMETER});
const showLoading = () => ({type: types.SET_SELECTED_PARAMETER_LOADING});

export {
  parameterPanelInit,
  toggleCodeNode,
  toggleDbNode,
  createNewNameSpace,
  setNewNameSpaceValue,
  setCreateNameSpaceStatePending,
  setCreateNameSpaceStateInvalid,
  setCreateNameSpaceStateCreated,
  showNameSpacePanel,
  showDbPanel,
  showLoading
};
