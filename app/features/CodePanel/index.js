import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput, Pane, Button } from 'evergreen-ui';
import CodeInput from '../CodeInput';
import TestInput from '../TestInput';
import {
  requestUpdateCode,
  requestCreateFunction
} from './actions/index.js';
import { NODE_TYPES } from '../ParametersPanel/actions/types.js';

class CodePanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      isValid: true
    };
    this.newFnName = '';
    this.onUpdateClick = this.onUpdateClick.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.onFnNameChange = this.onFnNameChange.bind(this);
  }

  componentDidMount () {
  }

  onUpdateClick () {
    const {nSpace, fName, code} = this.props.codePanel;
    this.props.requestUpdateCode(
      nSpace,
      fName,
      code
    );
  }

  onCreateClick () {
    const {nSpace, code, testInput} = this.props.codePanel;
    if (this.state.value.length > 0 ) {
      this.props.requestCreateFunction(
        nSpace,
        this.state.value,
        code,
        testInput
      );
      this.setState({isValid: true, value: ''});
    } else {
      this.setState({isValid: false});
    }
  }

  onFnNameChange (e) {
    this.newFnName = e.target.value;
    this.setState({value: e.target.value});
  }

  render () {
    const { nodeVariant } = this.props.codePanel;
    const buttonsRender = () => {
      switch(nodeVariant) {
        case NODE_TYPES.FUNCTION:
          return (
            <div>
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
            </div>
          );
        case NODE_TYPES.NAMESPACE:
          return (
            <div>
              <TextInput
                width="170px"
                isInvalid={!this.state.isValid}
                height={25}
                value={this.state.value}
                onChange={this.onFnNameChange}
                placeholder="New function name"
              />
              <Button
                marginRight={5}
                height={32}
                appearance="minimal"
                intent="success"
                onClick={this.onCreateClick}
                iconAfter="saved">
                Create
              </Button>
              <Button
                marginRight={5}
                height={32}
                appearance="default"
                intent="success"
                iconAfter="caret-right">
                Run
              </Button>
            </div>
          );
        default:
          return (
            <div />
          );
      }
    };
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
          minHeight="32px"
          display="flex"
          alignItems="center"
          marginBottom="2px"
          background="#E4E7EB"
          justifyContent="flex-end"
          border="none">
          { buttonsRender() }
        </Pane>
        <CodeInput code={this.props.codePanel.code} />
        <Pane
          width="100%"
          minHeight="8px"
          display="flex"
          alignItems="center"
          marginTop="2px"
          marginBottom="2px"
          background="#E4E7EB"
          justifyContent="flex-end"
          border="none" />
        <TestInput code={this.props.codePanel.testInput} />
      </Pane>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  requestUpdateCode: (nSpace, fName, code) => dispatch(requestUpdateCode(nSpace, fName, code)),
  requestCreateFunction: (nSpace, fName, code, testCode) => dispatch(requestCreateFunction(nSpace, fName, code, testCode))
});

const mapStateToProps = state => {
  const { codePanel } = state;
  return { codePanel };
};

CodePanel.propTypes = {
  codePanel: PropTypes.object,
  requestUpdateCode: PropTypes.func,
  requestCreateFunction: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CodePanel);
