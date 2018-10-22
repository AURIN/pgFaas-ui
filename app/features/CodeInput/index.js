import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import CodeMirror from 'react-codemirror';
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
        justifyContent="flex-start"
        border="none">
        <CodeMirror
          className="code-mir-react"
          value={this.props.codeInput.code}
          mode="javascript"
          autoFocus={true}
          options={{
            lineNumbers: true,
            tabSize: 2,
          }} />
      </Pane>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setAppDimensions: () => dispatch({})
//   };
// };

const mapStateToProps = state => {
  const { codeInput } = state;
  return { codeInput };
};

CodeInput.propTypes = {
  setAppDimensions: PropTypes.func,
  codeInput: PropTypes.object
};

export default connect(mapStateToProps, null)(CodeInput);
