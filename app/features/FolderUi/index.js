import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Treebeard} from 'react-treebeard';
import { Pane, Text, Icon } from 'evergreen-ui';
import treeStyles from './styles/tree.js';
import { showFunctionRequest } from '../CodePanel/actions/index.js';
import { toggleCodeNode } from '../ParametersPanel/actions/index.js';
import * as _ from 'lodash';
import './styles/styles.css';

class FolderTree extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  /**
   * Add presentational elements to the tree structure
   */
  hydratedTreeStructure () {
    const structure = _.cloneDeep(this.props.parameterPanel.data);
    return Object.assign(
      {},
      structure,
      {
        decorators: {
          Header: props => (
            <Text
              fontWeight="bold"
              style={props.style}>
              {props.node.name}
            </Text>)
        },
        children: structure.children.map(struct => Object.assign(
          struct,
          {
            decorators: {
              Header: (props) => {
                return (
                  <Text
                    style={props.style}
                    cursor="pointer">
                    {props.node.name}
                  </Text>
                );
              }
            },
            children: struct.children.map(child => Object.assign(
              child,
              {
                decorators: {
                  Header: (props) => {
                    return (
                      <Text
                        style={props.style}
                        { ...(props.node.active ? { color: '#47B881', fontWeight: 'bold' } : {}) }
                        className="function-text"
                        onClick={() => this.props.showFunctionRequest(props.node.nSpaceParent, props.node.name)}>
                        {props.node.name}
                      </Text>
                    );
                  }
                }
              }
            )
            )
          })
        ).concat({
          ignore: true,
          name: 'create new',
          children: [],
          decorators: {
            Header: (props) => {
              return (
                <Pane
                  display="flex"
                  marginLeft="-5px"
                  alignItems="center"
                  alignContent="center"
                >
                  <Icon icon="add" color="success"/>
                  <Text
                    style={props.style}
                    marginLeft="8px"
                    cursor="pointer">
                    {props.node.name}
                  </Text>
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
        onToggle={this.props.toggleCodeNode}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showFunctionRequest: (nSpace, fName) => dispatch(showFunctionRequest(nSpace, fName)),
    toggleCodeNode: (node, toggled) => dispatch(toggleCodeNode(node, toggled))
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
