import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { setAppDimensions } from './actions/index.js';
import { Pane, Text, Button } from 'evergreen-ui';
import './styles/app.css';
import CodeInput from '../CodeInput';
import TopBar from '../TopBar';

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
          margin="50px"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          border="default"
        >
          <Pane
            width="15%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="none"
          >
            <Text>Pane</Text>
          </Pane>
          <Pane
            width="0.5%"
            height="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="flex-start"
            background="tint2"
            border="none" />
          <Pane
            width="42%"
            height="100%"
            display="flex"
            paddingLeft="20px"
            alignItems="center"
            flexDirection="column"
            justifyContent="flex-start"
            border="none">
            <Pane
              width="100%"
              display="flex"
              alignItems="center"
              margin="2px"
              justifyContent="flex-end"
              border="none">
              <Button
                marginRight={5}
                height={32}
                appearance="default"
                intent="success"
                iconAfter="caret-right">
                Run
              </Button>

            </Pane>
            <CodeInput />
          </Pane>
          <Pane
            width="0.5%"
            height="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="flex-start"
            background="tint2"
            border="none" />
          <Pane
            width="42%"
            display="flex"
            paddingLeft="20px"
            alignItems="center"
            flexDirection="column"
            justifyContent="flex-start"
            border="none">
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
