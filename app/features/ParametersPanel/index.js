import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Pane, Text } from 'evergreen-ui';
import FolderTree from '../FolderUi';
import { parameterPanelInit } from './actions/index.js';

class ParametersPanel extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.parameterPanelInit();
  }

  render () {
    return (
      <Pane
        width="20%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        alignContent="flex-start"
        justifyContent="flex-start"
        border="none"
      >
        <Pane
          height="5%"
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          alignContent="flex-start"
          justifyContent="flex-start"
          border="none">
          <Pane
            className="parameter-panel-tab"
            width="50%"
            height="32px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            background="#E4E7EB"
            alignContent="center"
            justifyContent="center"
            border="none">
            <Text> NameSpaces </Text>
          </Pane>
          <Pane
            className="parameter-panel-tab"
            width="50%"
            display="flex"
            height="32px"
            background="#E4E7EB"
            flexDirection="column"
            alignItems="center"
            alignContent="center"
            justifyContent="center"
            border="none">
            <Text> Databases </Text>
          </Pane>
        </Pane>
        <FolderTree />
      </Pane>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    parameterPanelInit: () => dispatch(parameterPanelInit()),
  };
};

const mapStateToProps = state => {
  const { parameterPanel } = state;
  return { parameterPanel };
};

ParametersPanel.propTypes = {
  parameterPanel: PropTypes.object,
  parameterPanelInit: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ParametersPanel);
