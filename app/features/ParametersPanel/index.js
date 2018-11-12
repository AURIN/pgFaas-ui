import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Pane, Text, Spinner, Icon } from 'evergreen-ui';
import FolderTree from '../FolderUi';
import DatabaseTree from '../DatabaseTree';
import { parameterPanelInit } from './actions/index.js';
import { PARAMETER_TYPES } from './actions/types.js';
import { showNameSpacePanel, showDbPanel } from './actions/index.js';
import './styles/index.css';

class ParametersPanel extends React.Component {
  constructor (props) {
    super(props);
    this.refreshRequestClick = this.refreshRequestClick.bind(this);
  }

  componentDidMount () {
    this.props.parameterPanelInit();
  }

  refreshRequestClick () {
    const { selectedParameter } = this.props.parameterPanel;
    if (selectedParameter === PARAMETER_TYPES.NS_FUNC) {
      this.props.showNameSpacePanel();
    }else if (selectedParameter === PARAMETER_TYPES.DATABASES) {
      this.props.showDbPanel();
    }
  }

  render () {
    const { selectedParameter } = this.props.parameterPanel;

    const loadingDiv = () => (
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignContent="center"
        justifyContent="center" >
        <Text> Loading... </Text> <Spinner />
      </Pane>
    );

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
          flex="0 0 32px"
          width="100%"
          display="flex"
          borderBottom="1px solid #C7CED4"
          flexDirection="row"
          alignItems="flex-start"
          alignContent="flex-start"
          justifyContent="flex-start"
          border="none">
          <Pane
            className="parameter-panel-tab"
            onClick={this.refreshRequestClick}
            width="10%"
            height="32px"
            display="flex"
            title="refresh"
            flexDirection="column"
            borderBottom="1px solid #C7CED4"
            alignItems="center"
            background="#E4E7EB"
            alignContent="center"
            justifyContent="center"
            border="none">
            <Icon icon="refresh" color="info"/>
          </Pane>
          <Pane
            className="parameter-panel-tab"
            onClick={this.props.showNameSpacePanel}
            { ...(selectedParameter === PARAMETER_TYPES.NS_FUNC ? {
              borderTop: '1px solid #c1c1d7',
              borderLeft: '1px solid #c1c1d7',
              borderRight: '1px solid #c1c1d7'
            } : {}) }
            width="45%"
            height="32px"
            display="flex"
            flexDirection="column"
            borderBottom="1px solid #C7CED4"
            alignItems="center"
            background={ selectedParameter === PARAMETER_TYPES.NS_FUNC ? '#e0e0eb' : '#E4E7EB' }
            alignContent="center"
            justifyContent="center"
            border="none">
            <Text> NameSpaces </Text>
          </Pane>
          <Pane
            className="parameter-panel-tab"
            onClick={this.props.showDbPanel}
            { ...(selectedParameter === PARAMETER_TYPES.DATABASES ? {
              borderTop: '1px solid #c1c1d7',
              borderLeft: '1px solid #c1c1d7',
              borderRight: '1px solid #c1c1d7'
            } : {}) }
            width="45%"
            display="flex"
            height="32px"
            background={ selectedParameter === PARAMETER_TYPES.DATABASES ? '#e0e0eb' : '#E4E7EB' }
            borderBottom="1px solid #C7CED4"
            flexDirection="column"
            alignItems="center"
            alignContent="center"
            justifyContent="center"
            border="none">
            <Text> Database </Text>
          </Pane>
        </Pane>
        <Pane
          flex="1 1 auto"
          width="100%"
          paddingLeft="10px"
          overflowY= "auto"
          overflowX= "auto"
          paddingTop="15px" >
          { selectedParameter === PARAMETER_TYPES.NS_FUNC && <FolderTree /> }
          { selectedParameter === PARAMETER_TYPES.DATABASES && <DatabaseTree /> }
          { selectedParameter === PARAMETER_TYPES.LOADING && loadingDiv() }
        </Pane>
      </Pane>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    parameterPanelInit: () => dispatch(parameterPanelInit()),
    showNameSpacePanel: () => dispatch(showNameSpacePanel()),
    showDbPanel: () => dispatch(showDbPanel())
  };
};

const mapStateToProps = state => {
  const { parameterPanel } = state;
  return { parameterPanel };
};

ParametersPanel.propTypes = {
  parameterPanel: PropTypes.object,
  parameterPanelInit: PropTypes.func,
  showNameSpacePanel: PropTypes.func,
  showDbPanel: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ParametersPanel);
