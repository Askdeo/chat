import React from 'react'
import { Header, Segment, Input, Icon} from 'semantic-ui-react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

const MessagesHeader = (props) => {
    return (
        <Segment clearing>
            {/* Channel Title */}
            <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
                <span>
                    {props.currentChannel.name}
                    <Icon name='star outline' color='black'/>
                </span>
                <Header.Subheader>
                    2 Users
                </Header.Subheader>
                {/* Channel Search Input */}
            </Header>
            <Header floated='right'>
                <Input 
                    size='mini'
                    icon='search'
                    name='searchTerm'
                    placeholder='Search Messages'
                />
            </Header>
        </Segment>
    )
}

const mapStateToProps = state => {
    return {
        channels : state.channels.channels,
        currentChannel: state.channels.currentChannel
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(MessagesHeader);