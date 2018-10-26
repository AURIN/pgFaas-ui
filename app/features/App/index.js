import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { setAppDimensions } from './actions/index.js';
import { Pane } from 'evergreen-ui';
import './styles/app.css';
import TopBar from '../TopBar';
import ParametersPanel from '../ParametersPanel';
import CodePanel from '../CodePanel';
import OutputPanel from '../OutputPanel/';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      code: '// Code',
    };
    props.setAppDimensions(window.innerWidth, window.innerHeight);
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    nextProps;
  }

  render () {
    return(
      <div>
        <TopBar/>
        <Pane
          height="800px"
          margin="25px"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          border="default"
        >
          <ParametersPanel />
          <Pane className="divider" >
            <Pane className="topDivider" />
            <Pane className="bottomDivider" />
          </Pane>
          <CodePanel />
          <Pane className="divider" >
            <Pane className="topDivider" />
            <Pane className="bottomDivider" />
          </Pane>
          <OutputPanel />
        </Pane>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAppDimensions: (width, height) => dispatch(setAppDimensions(width, height)),
  };
};

const mapStateToProps = state => {
  state;
  return {};
};

App.propTypes = {
  setAppDimensions: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
