import React from 'react';
import { Pane } from 'evergreen-ui';
import '@fortawesome/fontawesome-free/css/all.css';

class TopBar extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return(
      <Pane
        margin=""
        top="0px"
        width="100%"
        height="55px"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        border="default"
      >
        <Pane
          margin=""
          top="0px"
          width="5%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="none"
        >
          <i className="fas fa-hippo" title="pgFaas"></i>
        </Pane>
      </Pane>
    );
  }
}

export default TopBar;
