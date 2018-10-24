import * as types from './types';

const parameterPanelInit = () => ({ type: types.PARAMETER_PANEL_INIT });
const toggleCodeNode = (node, toggled) => ({ type: types.TOGGLE_CODE_TREE, node, toggled });

export {
  parameterPanelInit,
  toggleCodeNode
};
