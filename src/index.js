import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Switch, Route, withRouter} from 'react-router-dom'
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Signup/Signup';

import * as serviceWorker from './serviceWorker';

import authReducer from './store/reducers/authReducer';
import channelReducer from './store/reducers/channelReducer';
import messagesReducer from './store/reducers/messagesReducer';
import profilesReducer from './store/reducers/profileReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    channels: channelReducer,
    messages: messagesReducer,
    profiles: profilesReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development'  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

 const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


const Root = (props) => {
    return(
        
        <Switch>
            {/* <Route exact path='/' component={props.token || localStorage.getItem('token') ? App : Login} />  */}
            <Route exact path='/' component={props.token ? App : Login} /> 
            <Route  path='/signup' component={Signup} />
        </Switch>
            
    )
    
}

const mapStateFromProps = state => ({
    token: state.auth.token
  });
  
  const RootWithAuth = withRouter(
    connect(
      mapStateFromProps,
      null
    )(Root)
  );

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
      <RootWithAuth />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
