import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/auth/authSlice';

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    };
    dispatch(registerUser(formData)).then((result) => {
        if (result.payload && result.payload.token) {
          window.sessionStorage.setItem('token', result.payload.token);
          navigate('/');
        } else {
          console.log('Error registering user');
        }
      }).catch((error) => {
        console.log('Something went wrong', error);
      });
    }
};
return{
    
}
    export default Registration;