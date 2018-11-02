import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon, Spinner, Pane, Text, defaultTheme} from 'evergreen-ui';
import { CONSOLE_STATE } from './actions/types.js';
import { resetOutput } from './actions/index.js';
import './styles/styles.css';

class OutputPanel extends React.Component {
  constructor (props) {
    super(props);
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
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          alignContent="flex-start"
          justifyContent="flex-start"
          border="none" >
          <Text color="white"> >> { output } </Text>
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
