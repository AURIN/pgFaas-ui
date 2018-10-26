import React from 'react';
import { Pane, Text} from 'evergreen-ui';

class OutputPanel extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
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
          alignItems="flex-start"
          alignContent="flex-start"
          justifyContent="flex-start"
          border="none" />
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
          <Text color="white"> >> </Text>
        </Pane>
      </Pane>
    );
  }
}

export default OutputPanel;
