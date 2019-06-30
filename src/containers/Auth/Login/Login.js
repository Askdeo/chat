import React, { useState} from 'react'
import './Login.css'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

const Login = (props) => {

    const [ userData, setUserData ] = useState({
      email: '',
      password: ''
    });

    const [ errors, setErrors ] = useState([])

    const loginHandler = (event) => {
      setUserData({
        ...userData,
        [event.target.name] : event.target.value  
      });
    };
  
    const displayErrors = errors =>
    errors.map((error, i) => {
      return <p key={i}>{error.message}</p>
    })

    const inputErrorsClassNameHandler = (errors, inputName) => {
      if (errors.some( error => {
        return error.message.toLowerCase().includes(inputName)
      })) {
        return 'error'
      } else {
        return ''
      }
      
    }
    
    const submitFormHandler = (event) => {
        event.preventDefault();
        // setLoading(true);
        props.onLogin(userData);
        //  new Promise ()
        //  .then( n => {
        //   if (props.errors) {setErrors([props.errors])}
        //  })
        //  .then( n => {
        //    if(!props.errors) { props.history.push('/')}
        //  })       
      //   axios.post('http://localhost:5000/login', userData)
      //     .then(res => {
      //       setLoading(false);
      //       console.log(res);
      //     })
      //     .catch(err => {
      //       setLoading(false);
      //       setErrors([err]);
      //       console.log(err);
      //     })
      };

     
    return (
        <Grid className='signup' textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h1' icon color='blue' textAlign='center'>
                <Icon name='plug'/>
                Login
              </Header>
              <Form onSubmit={submitFormHandler} size='large'>
                <Segment stacked>
                  <Form.Input className={inputErrorsClassNameHandler(errors, 'email')} onChange={loginHandler} fluid name='email' icon='mail' iconPosition='left' placeholder='Email Address' type='email' />
                  <Form.Input className={inputErrorsClassNameHandler(errors, 'password')} onChange={loginHandler} fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' />
                  <Button disabled={props.loading} className={props.loading ? 'loading' : null} color='blue' fluid size='large'>
                    Submit
                  </Button>
                </Segment>
              </Form>
              {errors.length > 0  ? <Message negative>
                <h3>Error</h3>
                {displayErrors(errors)}
              </Message> : null }
              <Message>
                Don't have an account ? <Link to='/signup'>SignUp</Link>
                <Link to='/'>Home</Link>
              </Message>
            </Grid.Column>
        </Grid>
    )
}
const mapStateToProps = state => {
  return {
      token : state.auth.token,
      errors: state.auth.errors,
      loading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onLogin: (user) => dispatch(actions.login(user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login;