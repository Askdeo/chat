import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import './App.css';

import * as actions from './store/actions/index';


import ColorPanel from './containers/ColorPanel/ColorPanel';
import SidePanel from './containers/SidePanel/SidePanel';
import MetaPanel from './containers/MetaPanel/MetaPanel';
import Messages from './containers/Messages/Messages';

function App(props) {
  const getProfiles = () => {
    props.onGetProfiles()
  }

  useEffect(() => {
    getProfiles()
  }, [])

  return (
      <Grid columns='equal' className='app'>
        <ColorPanel/>
        <SidePanel/>

        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages/>
        </Grid.Column>

        <Grid.Column width={4}>
          <MetaPanel/>
        </Grid.Column>
      </Grid>
  );
}
const mapStateToProps = state => {
  return {
      token : state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onGetProfiles: () => dispatch(actions.getProfiles()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);