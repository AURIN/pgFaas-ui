import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { TextInput, Position, Pane, Icon, Popover } from 'evergreen-ui';
import { createNewNameSpace, setNewNameSpaceValue } from '../../../ParametersPanel/actions/index.js';
import { NAMESPACE_STATES } from '../../../ParametersPanel/actions/types.js';

class NewNameSpacePopover extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      state: NAMESPACE_STATES.INVALID
    };
    this.newValue = '';
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.props.createNewNameSpace(this.newValue);
    }
  }

  onChange (e) {
    const value = e.target.value;
    this.newValue = e.target.value;
    this.setState({
      value: value,
      state: value.length > 0 ? NAMESPACE_STATES.VALID : NAMESPACE_STATES.INVALID
    });
  }

  render () {
    const { state: dialogState, value } = this.state;
    const showIcon = () => {
      switch(dialogState) {
        case NAMESPACE_STATES.INVALID:
          return null;
        case NAMESPACE_STATES.VALID:
          return (
            <Icon
              icon="small-tick"
              onClick={this.createNewNameSpace}
            />
          );
        default:
          return null;
      }
    };
    return (
      <Popover
        bringFocusInside={true}
        minHeight="32px"
        position={Position.BOTTOM_LEFT}
        content={
          <Pane
            padding="2px"
            display="flex"
            alignItems="center"
            alignContent="center" >
            <TextInput
              autoFocus
              width="170px"
              value={value}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              placeholder="type namespace"
            />
            {showIcon()}
          </Pane>
        }>
        {this.props.children}
      </Popover>
    );
  }
}

NewNameSpacePopover.propTypes = {
  children: PropTypes.object,
  parameterPanel: PropTypes.object,
  createNewNameSpace: PropTypes.func,
  setNewNameSpaceValue: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  createNewNameSpace: newNameSpace => dispatch(createNewNameSpace(newNameSpace)),
  setNewNameSpaceValue: newNameSpace => dispatch(setNewNameSpaceValue(newNameSpace))
});

const mapStateToProps = state => {
  const { parameterPanel } = state;
  return { parameterPanel };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNameSpacePopover);
