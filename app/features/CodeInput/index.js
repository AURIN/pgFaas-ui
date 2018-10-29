import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Pane, Text, defaultTheme } from 'evergreen-ui';
import {Controlled as CodeMirror} from 'react-codemirror2';
import { updateCode } from '../CodePanel/actions/index.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import './styles/styles.css';

class CodeInput extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return(
      <Pane
        width="100%"
        height="50%"
        overflow="hide"
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        marginTop="2px"
        justifyContent="flex-start"
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
              Function Code
          </Text>
        </Pane>
        <Pane
          display="flex"
          height="95%"
          alignItems="center"
          flexDirection="column"
          justifyContent="center" >
          <CodeMirror
            className="code-mir-react"
            value={this.props.code}
            mode="javascript"
            autoFocus={true}
            onBeforeChange={(editor, data, value) => {
              this.props.updateCode(value);
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
  updateCode: code => dispatch(updateCode(code))
});

CodeInput.propTypes = {
  setAppDimensions: PropTypes.func,
  code: PropTypes.string,
  updateCode: PropTypes.func
};

export default connect(null, mapDispatchToProps)(CodeInput);
