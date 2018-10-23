import React from 'react';
import PropTypes from 'prop-types';
import {Treebeard} from 'react-treebeard';
import treeStyles from './styles/tree.js';

class FolderTree extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle (node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
  }

  render () {
    return(
      <Treebeard
        style={treeStyles}
        data={this.props.structure}
        onToggle={this.onToggle}
      />
    );
  }
}

FolderTree.propTypes = {
  structure: PropTypes.object
};

export default FolderTree;
