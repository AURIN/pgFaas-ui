import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { setAppDimensions } from './actions/index.js';
import { Pane, Text} from 'evergreen-ui';
import './styles/app.css';
import TopBar from '../TopBar';
import ParametersPanel from '../ParametersPanel';
import CodePanel from '../CodePanel';

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
          <Pane
            width="42%"
            height="100%"
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            justifyContent="flex-start"
            border="none">
            <Pane
              background="#E4E7EB"
              height="32px"
              width="100%"
              display="flex"
              borderBottom="1px solid #C7CED4"
              flexDirection="row"
              alignItems="flex-start"
              alignContent="flex-start"
              justifyContent="flex-start"
              border="none" />
            <Text>Pane</Text>
          </Pane>
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
