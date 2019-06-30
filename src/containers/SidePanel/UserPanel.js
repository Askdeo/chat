import React from 'react'
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import * as actions from '../../store/actions/index';

const  UserPanel = (props) => {

    const logoutHandler = () => {
        props.onLogout()
        props.history.push('/login')
    }

    const dropdownOptions = () => [
        {
          key: "user",
          text: (
            <span>
              Signed in as <strong>{props.token.username}</strong>
            </span>
          ),
          disabled: true
        },
        {
          key: "avatar",
          text: <span>Change Avatar</span>
        },
        {
          key: "logout",
          text: <span onClick={logoutHandler}>LogOut</span>
        }
      ];
        

    return (
        <Grid>
            <Grid.Column>
                <Grid.Row style={{ padding: '1.2rem', margin: 0 }}>
                     {/* App header */}
                    <Header inverted floated='left' as='h2'>
                        <Icon name='american sign language interpreting'/>
                        <Header.Content>Chat</Header.Content>
                    </Header>
                </Grid.Row>

                {/* User Dropdown */}
                <Header style={{ padding: '0.25rem' }} as='h4' inverted>
                    <Dropdown trigger={
                        <span>
                            <Image src='http://localhost:5000/images/dummy-avatar-300x300.jpg' spaced='right' avatar/>
                            {props.token.username}
                        </span>
                    } options={dropdownOptions()} />
                </Header>
            </Grid.Column>
        </Grid>
    )
}
  
const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        onLogout: (user) => dispatch(actions.logout(user))
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPanel));
