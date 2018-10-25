import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import {Controlled as CodeMirror} from 'react-codemirror2';
import { updateTestCode } from '../CodePanel/actions/index.js';
// import '../CodeInput/styles/styles.css';

class TestInput extends React.Component {
  constructor (props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount () {
    // console.warn(this.ref);
    // window.d = this.ref;
  }

  render () {
    return(
      <Pane
        width="100%"
        overflow="hide"
        height="40%"
        display="flex"
        alignItems="flex-start"
        margin="2px"
        marginRight="20px"
        paddingLeft="5px"
        justifyContent="flex-start"
        border="none">
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateTestCode: code => dispatch(updateTestCode(code))
});

TestInput.propTypes = {
  code: PropTypes.string,
  updateTestCode: PropTypes.func
};

export default connect(null, mapDispatchToProps)(TestInput);
