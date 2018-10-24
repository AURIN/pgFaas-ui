import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import {Controlled as CodeMirror} from 'react-codemirror2';
import { updateCode } from '../CodePanel/actions/index.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import './styles/styles.css';

class CodeInput extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    nextProps;
  }

  render () {
    return(
      <Pane
        width="100%"
        display="flex"
        alignItems="flex-start"
        margin="2px"
        paddingLeft="5px"
        justifyContent="flex-start"
        border="none">
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
            tabSize: 2,
          }} />
      </Pane>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCode: code => dispatch(updateCode(code))
  };
};

CodeInput.propTypes = {
  setAppDimensions: PropTypes.func,
  code: PropTypes.string,
  updateCode: PropTypes.func
};

export default connect(null, mapDispatchToProps)(CodeInput);
