import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

const SignupForm = ({history, handleSignupOrLogin, updateMessage}) => {

  const [signupInfo, setSignupInfo] = useState({
    name:'',
    email:'',
    password:'',
    passwordConf:''
  })

  const handleChange = (e) => {
    updateMessage('');
    setSignupInfo({...signupInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(signupInfo);
      handleSignupOrLogin();
      history.push('/');
    } catch (err) {
      updateMessage(err.message);
    }
  }

  const isFormInvalid = () => {
    return !(signupInfo.name && signupInfo.email && signupInfo.password === signupInfo.passwordConf);
  }
  
  return (
    <div>
      <h3>Sign Up</h3>
      <form className="col s12" autoComplete="off" onSubmit={handleSubmit} >
        <div className="row">
          <div className="input-field col s12">
            <input type="text" autoComplete="off" className="active" id="name" value={signupInfo.name} name="name" onChange={handleChange} placeholder="Name"/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input type="text" autoComplete="off" className="active" id="email" value={signupInfo.email} name="email" onChange={handleChange} placeholder="Email"/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input type="password" autoComplete="off" className="active" id="password" value={signupInfo.password} name="password" onChange={handleChange} placeholder="Password"/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input type="password" autoComplete="off" className="active" id="confirm" value={signupInfo.passwordConf} name="passwordConf" onChange={handleChange} placeholder="Confirm Password"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button className="btn green" disabled={isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
            <Link className="btn red" to='/'>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;