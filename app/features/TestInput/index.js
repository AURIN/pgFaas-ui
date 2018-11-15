import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Pane, Text, defaultTheme } from 'evergreen-ui';
import {Controlled as CodeMirror} from 'react-codemirror2';
import { updateTestCode } from '../CodePanel/actions/index.js';
import '../CodeInput/styles/styles.css';

class TestInput extends React.Component {
  constructor (props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount () {
    window.d = defaultTheme;
  }

  render () {
    return(
      <Pane
        width="100%"
        overflow="hide"
        height="48%"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        marginTop="2px"
        border="none">
        <Pane
          display="flex"
          height="5%"
          width="100%"
          alignItems="center"
          flexDirection="row"
          alignItems="center"
          justifyContent="center" >
          <Text
            fontSize="12px"
            color={defaultTheme.colors.icon.disabled}>
              Function Parameters
          </Text>
          <Text
            fontSize="12px"
            color="red">
            { ' ' + this.props.testCodeError }
          </Text>
        </Pane>
        <Pane
          display="flex"
          height="95%"
          width="100%"
          alignItems="center"
          flexDirection="column"
          justifyContent="center" >
          <CodeMirror
            className="code-mir-react"
            ref={this.ref}
            value={this.props.code}
            mode="javascript"
            autoFocus={true}
            onBeforeChange={(editor, data, value) => {
              this.props.updateTestCode(value);
            }}
            options={{
              lineNumbers: true,
              lineWrapping: true,
              tabSize: 2,
            }} />
        </Pane>
      </Pane>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateTestCode: code => dispatch(updateTestCode(code))
});

TestInput.propTypes = {
  code: PropTypes.string,
  error: PropTypes.string,
  updateTestCode: PropTypes.func,
  testCodeError: PropTypes.string
};

export default connect(null, mapDispatchToProps)(TestInput);
