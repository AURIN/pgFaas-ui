import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Pane, Button } from 'evergreen-ui';
import CodeInput from '../CodeInput';
import { requestUpdateCode } from './actions/index.js';

class CodePanel extends React.Component {
  constructor (props) {
    super(props);
    this.onUpdateClick = this.onUpdateClick.bind(this);
  }

  componentDidMount () {
  }

  onUpdateClick () {
    const {nSpace, fName, code} = this.props.codePanel;
    if (!nSpace || !fName) return;
    this.props.requestUpdateCode(
      nSpace,
      fName,
      code
    );
  }

  render () {
    return (
      <Pane
        width="42%"
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="flex-start"
        border="none">
        <Pane
          width="100%"
          display="flex"
          alignItems="center"
          marginBottom="2px"
          background="#E4E7EB"
          justifyContent="flex-end"
          border="none">
          <Button
            marginRight={5}
            height={32}
            appearance="minimal"
            intent="success"
            onClick={this.onUpdateClick}
            iconAfter="upload">
            Upload
          </Button>
          <Button
            marginRight={5}
            height={32}
            appearance="minimal"
            intent="warning"
            iconAfter="delete">
            Delete
          </Button>
          <Button
            marginRight={5}
            height={32}
            appearance="default"
            intent="success"
            iconAfter="caret-right">
            Run
          </Button>
        </Pane>
        <CodeInput code={this.props.codePanel.code} />
      </Pane>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestUpdateCode: (nSpace, fName, code) => dispatch(requestUpdateCode(nSpace, fName, code))
  };
};

const mapStateToProps = state => {
  const { codePanel } = state;
  return { codePanel };
};

CodePanel.propTypes = {
  codePanel: PropTypes.object,
  requestUpdateCode: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CodePanel);
