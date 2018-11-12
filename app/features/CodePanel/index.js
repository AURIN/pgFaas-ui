import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Text, TextInput, Pane, Button } from 'evergreen-ui';
import CodeInput from '../CodeInput';
import TestInput from '../TestInput';
import { requestInvokeFunction } from '../OutputPanel/actions/index.js';
import {
  requestUpdateCode,
  requestCreateFunction,
  requestDeleteFunction,
  requestDeleteNamespace
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
    this.onRunClick = this.onRunClick.bind(this);
    this.onDeleteFunctionClick = this.onDeleteFunctionClick.bind(this);
    this.onDeleteNameSpaceClick = this.onDeleteNameSpaceClick.bind(this);
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

  onRunClick () {
    const {nSpace, fName, testInput} = this.props.codePanel;
    this.props.requestInvokeFunction(nSpace, fName, testInput);
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

  onDeleteFunctionClick () {
    const {nSpace, fName} = this.props.codePanel;
    this.props.requestDeleteFunction(
      nSpace,
      fName
    );
  }

  onDeleteNameSpaceClick () {
    const {nSpace} = this.props.codePanel;
    this.props.requestDeleteNamespace(
      nSpace
    );
  }

  onFnNameChange (e) {
    this.newFnName = e.target.value;
    this.setState({value: e.target.value});
  }

  render () {
    const { nodeVariant, fName, nSpace } = this.props.codePanel;
    const buttonsRender = () => {
      switch(nodeVariant) {
        case NODE_TYPES.NONE:
          return (<div />);
        case NODE_TYPES.FUNCTION:
          return ([
            <div>
              <Text paddingLeft="30px"> Function : {`${nSpace} / ${fName}`} </Text>
            </div>,
            <div>
              <Button
                marginRight={5}
                height={32}
                appearance="minimal"
                intent="success"
                onClick={this.onUpdateClick}
                iconAfter="upload">
                Update
              </Button>
              <Button
                marginRight={5}
                height={32}
                appearance="minimal"
                intent="warning"
                onClick={this.onDeleteFunctionClick}
                iconAfter="delete">
                Delete
              </Button>
              <Button
                marginRight={5}
                height={32}
                appearance="default"
                intent="success"
                onClick={this.onRunClick}
                iconAfter="caret-right">
                Run
              </Button>
            </div>
          ]);
        case NODE_TYPES.NAMESPACE:
          return ([
            <div>
              <Text paddingLeft="30px"> Namespace: {`${nSpace}`} </Text>
            </div>,
            <div>
              <Button
                marginRight={5}
                height={32}
                appearance="minimal"
                intent="warning"
                onClick={this.onDeleteNameSpaceClick}
                iconAfter="delete">
                Delete
              </Button>
            </div>
          ]);
        case NODE_TYPES.NEW_FUNCTION:
          return ([
            <div/>,
            <div>
              <Text> Create a new function : </Text>
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
            </div>
          ]);
        case NODE_TYPES.EMPTY:
          return ([ <div /> ]);
        default:
          return ([ <div /> ]);
      }
    };
    return (
      <Pane
        width="42%"
        height="100%"
        overflow="hidden"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="flex-start"
        border="none">
        <Pane
          width="100%"
          height="32px"
          display="flex"
          alignItems="center"
          marginBottom="2px"
          borderBottom="1px solid #C7CED4"
          background="#E4E7EB"
          justifyContent="space-between"
          border="none">
          { buttonsRender().map((e, inx) => (<div key={inx}> {e}</div>)) }
        </Pane>
        { nodeVariant !== NODE_TYPES.NAMESPACE && <Pane width="100%" height="95%">
          <CodeInput code={this.props.codePanel.code} />
          <Pane
            width="100%"
            minHeight="8px"
            display="flex"
            alignItems="center"
            marginTop="2px"
            borderTop="1px solid #C7CED4"
            borderBottom="1px solid #C7CED4"
            marginBottom="2px"
            background="#E4E7EB"
            justifyContent="flex-end"
            border="none" />
          <TestInput
            code={this.props.codePanel.testInput}
            testCodeError={this.props.codePanel.testCodeError} />
        </Pane>}
      </Pane>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  requestUpdateCode: (nSpace, fName, code) => dispatch(requestUpdateCode(nSpace, fName, code)),
  requestCreateFunction: (nSpace, fName, code, testCode) => dispatch(requestCreateFunction(nSpace, fName, code, testCode)),
  requestInvokeFunction: (nSpace, fName, params) => dispatch(requestInvokeFunction(nSpace, fName, params)),
  requestDeleteFunction: (nSpace, fName)  => dispatch(requestDeleteFunction(nSpace, fName)),
  requestDeleteNamespace: (nSpace) => dispatch(requestDeleteNamespace(nSpace))
});

const mapStateToProps = state => {
  const { codePanel } = state;
  return { codePanel };
};

CodePanel.propTypes = {
  codePanel: PropTypes.object,
  requestUpdateCode: PropTypes.func,
  requestCreateFunction: PropTypes.func,
  requestInvokeFunction: PropTypes.func,
  requestDeleteFunction: PropTypes.func,
  requestDeleteNamespace: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CodePanel);
