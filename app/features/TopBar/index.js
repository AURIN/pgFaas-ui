import React from 'react';
import { Pane, Heading} from 'evergreen-ui';
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
        background="#336791"
        border="none"
      >
        <Pane
          margin=""
          top="0px"
          width="10%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="none"
        >
          <i
            style={{color: 'white'}}
            className="fas fa-hippo"
            title="pgFaas">
          </i>
          <i
            style={{color: 'white', paddingLeft: '5px'}}
            className="fas fa-hippo"
            title="pgFaas">
          </i>
          <i
            style={{color: 'white', paddingLeft: '5px'}}
            className="fas fa-hippo"
            title="pgFaas">
          </i>
        </Pane>
        <Heading size={600} color="white"> pgFaas </Heading>
      </Pane>
    );
  }
}

export default TopBar;
