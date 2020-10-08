import React, { useState } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css';

const SignupPage = ({history, handleSignupOrLogin}) => {
  const [message, setMessage] = useState('')

  const updateMessage = (msg) => {
    setMessage(msg)
  }

  return (
    <div className='SignupPage'>
      <SignupForm 
        history={history}
        handleSignupOrLogin={handleSignupOrLogin}
        updateMessage={updateMessage} 
      />
      <p>{message}</p>
    </div>
  );
}

export default SignupPage;