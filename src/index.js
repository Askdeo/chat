import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import App from './App';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';

import * as serviceWorker from './serviceWorker';

const Root = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route  path='/signup' component={Signup} />
                <Route  path='/login' component={Login} />
            </Switch>
        </BrowserRouter>
    )
    
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
