import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon, Spinner, Pane, Text, defaultTheme} from 'evergreen-ui';
import { CONSOLE_STATE, MESSAGE_TYPE } from './actions/types.js';
import { resetOutput } from './actions/index.js';
import './styles/styles.css';

class OutputPanel extends React.Component {
  constructor (props) {
    super(props);
    this.consoleEndRef = React.createRef();
  }

  componentDidUpdate () {
    if (this.consoleEndRef.current !== null) {
      this.consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render () {
    const { consoleState, output } = this.props.functOutput;
    const actionPanel = () => {
      switch (consoleState) {
        case CONSOLE_STATE.PENDING:
          return ([
            <div/>,
            <Pane display="inline-flex">
              <Spinner size={16} color={defaultTheme.colors.intent.success} />
              <Text marginLeft="5px"> Running function ... </Text>
            </Pane>
          ]);
        case CONSOLE_STATE.FAILED:
          return ([
            <div />,
            <Pane marginRight="8px" cursor="pointer">
              <Icon
                className="reset-hover"
                color="gray"
                icon="repeat"
                onClick={() => this.props.resetOutput()}
                title="clear" />
            </Pane>
          ]);
        case CONSOLE_STATE.NEUTRAL:
          return ([
            <div />,
            <Pane marginRight="8px" cursor="pointer">
              <Icon
                className="reset-hover"
                color="gray"
                icon="repeat"
                onClick={() => this.props.resetOutput()}
                title="clear" />
            </Pane>
          ]);
        default:
          return ([
            <div />
          ]);
      }
    };

    const consoleOutText = (msg) => {
      switch (msg.msgType) {
        case MESSAGE_TYPE.INVOKE_SUCCESS_OUTPUT:
          return(
            <Pane
              key={msg.counter}
              width="100%"
              flex="0 0 auto"
              display="flex"
              alignItems="flex-start"
              flexDirection="row"
              justifyContent="flex-start"
              border="none">
              <Text whiteSpace="pre" color="white" > >> </Text>
              <Text whiteSpace="pre" color="white" > { msg.output } </Text>
            </Pane>
          );
        case MESSAGE_TYPE.INVOKE_FAILURE_OUTPUT:
          return(
            <Pane
              key={msg.counter}
              width="100%"
              flex="0 0 auto"
              display="flex"
              alignItems="flex-start"
              flexDirection="row"
              justifyContent="flex-start"
              border="none">
              <Text whiteSpace="pre" color="white" > >> </Text>
              <Text color="#EC4C47" > { msg.output } </Text>
            </Pane>
          );
        default:
          return (<div/>);
      }
    };

    return(
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
          alignItems="center"
          alignContent="flex-start"
          justifyContent="space-between"
          border="none">
          {actionPanel().map((e, inx) => (<div key={inx}> {e}</div>)) }
        </Pane>
        <Pane
          background="#0D1323"
          opacity={0.9}
          height="100%"
          width="100%"
          overflow="scroll"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          alignContent="flex-start"
          justifyContent="flex-start"
          border="none" >
          { output.map((out, inx) => consoleOutText(out, inx)) }
          <Pane> <Text color="white"> >> </Text> </Pane>
          <div ref={this.consoleEndRef} />
        </Pane>
      </Pane>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  resetOutput: () => dispatch(resetOutput())
});

const mapStateToProps = state => {
  const { functOutput } = state;
  return { functOutput };
};

OutputPanel.propTypes = {
  functOutput: PropTypes.object,
  resetOutput: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(OutputPanel);
