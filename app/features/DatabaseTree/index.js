import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Treebeard} from 'react-treebeard';
import {Pane, Text} from 'evergreen-ui';
import treeStyles from './styles/tree.js';
import { toggleDbNode } from '../ParametersPanel/actions/index.js';
import './styles/styles.css';
import { TABLE_NODE_TYPES } from '../ParametersPanel/actions/types.js';
import * as _ from 'lodash';

class DatabaseTree extends React.Component {
  constructor (props) {
    super(props);
    this.onToggleNode = this.onToggleNode.bind(this);
    this.state = {};
  }

  onToggleNode (node, toggle) {
    if (!node.ignore) {
      this.props.toggleDbNode(
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
    const structure = _.cloneDeep(this.props.parameterPanel.dbData);
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
            variant: TABLE_NODE_TYPES.TABLE,
            decorators: {
              Header: props => (
                <Text
                  { ...(props.node.active ? { color: '#47B881', fontWeight: 'bold' } : {}) }
                  cursor="pointer"
                  style={props.style} >
                  {props.node.name}
                </Text>
              )
            },
            children: struct.children.map(child => Object.assign(
              child,
              {
                ignore: true,
                variant: TABLE_NODE_TYPES.COLUMN,
                decorators: {
                  Header: props => (
                    <Text
                      style={props.style}
                      { ...(props.node.active ? { color: '#47B881', fontWeight: 'bold' } : {}) }
                      cursor="default"
                      className="function-text">
                      {props.node.name}
                    </Text>
                  )
                }
              }
            ))
          })
        )
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
    toggleDbNode: (node, toggled, nodeVariant) => dispatch(toggleDbNode(node, toggled, nodeVariant))
  };
};

const mapStateToProps = state => {
  const { parameterPanel } = state;
  return { parameterPanel };
};

DatabaseTree.propTypes = {
  parameterPanel: PropTypes.object,
  toggleDbNode: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseTree);
