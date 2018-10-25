import * as types from './types';
import { NODE_TYPES } from '../actions/types.js';

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

const setNewNameSpaceValue = (value) => ({type: types.SET_NEW_NAME_SPACE_VALUE, value});
const setCreateNameSpaceStateInvalid = () => ({type: types.SET_NAME_SPACE_STATE, state: types.NAMESPACE_STATES.INVALID});
const setCreateNameSpaceStatePending = () => ({type: types.SET_NAME_SPACE_STATE, state: types.NAMESPACE_STATES.PENDING});
const setCreateNameSpaceStateCreated = () => ({type: types.SET_NAME_SPACE_STATE, state: types.NAMESPACE_STATES.CREATED});

export {
  parameterPanelInit,
  toggleCodeNode,
  createNewNameSpace,
  setNewNameSpaceValue,
  setCreateNameSpaceStatePending,
  setCreateNameSpaceStateInvalid,
  setCreateNameSpaceStateCreated,
};
