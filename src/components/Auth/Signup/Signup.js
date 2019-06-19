import React, { useState } from 'react'
import './Signup.css'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = (props) => {

    const [ userData, setUserData ] = useState({
      username: '',
      email: '',
      password: '',
      confirmedPassword: ''
    });

    const [ errors, setErrors ] = useState([])

    const signupHandler = (event) => {
      setUserData({
        ...userData,
        [event.target.name] : event.target.value  
      });
    };

    const isFormEmpty = (userData) => {
      return  !userData.username.length || !userData.email.length || !userData.password.length || !userData.confirmedPassword.length
    }

    const isPasswordValid = (userData) => {
      if (userData.password.length < 6 || userData.confirmedPassword.length < 6) {
        return false;
      } else if (userData.password !== userData.confirmedPassword) {
        return false;
      } else {
        return true;
      }
    }
  
    const isFormValid = () => {

      let error;

      if(isFormEmpty(userData)) {
        error = { message: 'You need to fill in all fiels'};
        setErrors([error]);
        return false;

      } else if (!isPasswordValid(userData)) {
        
        error = { message: 'Password is invalid'};
        setErrors([error]);

      } else {
        
        return true;
      }
    } 
    const displayErrors = errors =>
    errors.map((error, i) => {
      return <p key={i}>{error.message}</p>
    })


    const submitFormHandler = (event) => {
      if(isFormValid()){
        event.preventDefault();
        axios.post('http://localhost:5000/signup', userData)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
      }
     
    };
    return (
        <Grid className='signup' textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' icon color='blue' textAlign='center'>
                <Icon name='address card'/>
                SignUp for our Chat
              </Header>
              <Form onSubmit={submitFormHandler} size='large'>
                <Segment stacked>
                  <Form.Input onChange={signupHandler} fluid name='username' icon='user' iconPosition='left' placeholder='Username' type='text' />
                  <Form.Input onChange={signupHandler} fluid name='email' icon='mail' iconPosition='left' placeholder='Email Address' type='email' />
                  <Form.Input onChange={signupHandler} fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' />
                  <Form.Input onChange={signupHandler} fluid name='confirmedPassword' icon='repeat' iconPosition='left' placeholder='Confirm Password' type='password' />
                  <Button color='blue' fluid size='large'>
                    Submit
                  </Button>
                </Segment>
              </Form>
              {errors.length > 0  ? <Message negative>
                <h3>Error</h3>
                {displayErrors(errors)}
              </Message> : null }
              <Message>
                Already a user ? <Link to='/login'>Login</Link>
              </Message>
            </Grid.Column>
        </Grid>
    )
}
export default Signup;
