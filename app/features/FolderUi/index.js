import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Treebeard} from 'react-treebeard';
import { Spinner, Pane, Text, Icon } from 'evergreen-ui';
import treeStyles from './styles/tree.js';
import { showFunctionRequest } from '../CodePanel/actions/index.js';
import { toggleCodeNode } from '../ParametersPanel/actions/index.js';
import * as _ from 'lodash';
import './styles/styles.css';
import NewNameSpacePopover from './components/NewNameSpace/index.js';
import { NAMESPACE_STATES, NODE_TYPES } from '../ParametersPanel/actions/types.js';

class FolderTree extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.onToggleNode = this.onToggleNode.bind(this);
  }

  onToggleNode (node, toggle) {
    if (!node.ignore) {
      this.props.toggleCodeNode(
        node,
        toggle,
        node.variant
      );
    }
  }

  /**
   * Add presentational elements to the tree structure
   */
  hydratedTreeStructure () {
    const structure = _.cloneDeep(this.props.parameterPanel.data);
    const dialogState = this.props.parameterPanel.newNameSpaceDialog.state;
    return Object.assign(
      {},
      structure,
      {
        ignore: true,
        decorators: {
          Header: props => (
            <Text
              fontWeight="bold"
              style={props.style}>
              {props.node.name}
            </Text>),
          Toggle: props => {
            return (
              <Pane
                display="inline-block"
                style={props.style} />
            );
          }
        },
        children: structure.children.map(struct => Object.assign(
          struct,
          {
            variant: NODE_TYPES.NAMESPACE,
            decorators: {
              Header: props => (
                <Text
                  { ...(props.node.active ? { color: '#47B881', fontWeight: 'bold' } : {}) }
                  style={props.style}
                  cursor="pointer">
                  {props.node.name}
                </Text>
              )
            },
            children: struct.children.map(child => Object.assign(
              child,
              {
                variant: NODE_TYPES.FUNCTION,
                decorators: {
                  Header: props => (
                    <Text
                      style={props.style}
                      { ...(props.node.active ? { color: '#47B881', fontWeight: 'bold' } : {}) }
                      className="function-text"
                      onClick={() => this.props.showFunctionRequest(props.node.nSpaceParent, props.node.name)}>
                      {props.node.name}
                    </Text>
                  )
                }
              }
            )
            )
          })
        ).concat({
          ignore: true,
          name: 'new nameSpace',
          children: [],
          decorators: {
            Header: props => {
              return (
                <Pane
                  display="flex"
                  marginLeft="-5px"
                  alignItems="center"
                  alignContent="center"
                >
                  { dialogState === NAMESPACE_STATES.INVALID ?
                    <Icon icon="add" color="success"/>
                    :
                    <Spinner size={16} color="success" />
                  }
                  <NewNameSpacePopover>
                    <Text
                      className="create-text"
                      style={props.style}
                      marginLeft="8px"
                      cursor="pointer">
                      {props.node.name}
                    </Text>
                  </NewNameSpacePopover>
                </Pane>
              );
            },
            Toggle: props => {
              return (
                <div style={props.style} />
              );
            }
          }
        })
      }
    );
  }


  render () {
    const structure = this.hydratedTreeStructure();
    return(
      <Treebeard
        style={treeStyles}
        data={structure}
        onToggle={this.onToggleNode}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showFunctionRequest: (nSpace, fName) => dispatch(showFunctionRequest(nSpace, fName)),
    toggleCodeNode: (node, toggled, nodeVariant) => dispatch(toggleCodeNode(node, toggled, nodeVariant))
  };
};

const mapStateToProps = state => {
  const { parameterPanel } = state;
  return { parameterPanel };
};

FolderTree.propTypes = {
  parameterPanel: PropTypes.object,
  showFunctionRequest: PropTypes.func,
  toggleCodeNode: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderTree);
