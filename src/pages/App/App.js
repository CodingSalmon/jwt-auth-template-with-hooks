import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';

import NavBar from "../../components/NavBar/NavBar";

import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import ForgotPasswordPage from '../ForgotPasswordPage/ForgotPasswordPage'
import ResetPasswordPage from '../ResetPasswordPage/ResetPasswordPage'
import UserPage from '../UserPage/UserPage'
import UsersPage from '../UsersPage/UsersPage'
import FollowListPage from '../FollowListPage/FollowListPage'

import userService from '../../services/userService';

import "./App.css";

const App = () => {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([])

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  };

  const determineError = (msg) => {
    if (msg.includes('Error')) return 'red-text'
    return 'green-text'
  }

  useEffect(() => {
    (async () => {
      setUser(userService.getUser())
      const currentUsers = await userService.getAllUsers()
      setUsers(currentUsers)
    })()
  },[])

  return (
    <>
      <NavBar 
        user={user}
        handleLogout={handleLogout}
      />

      <Switch>
        <Route path={['/user/:id/followers', '/user/:id/following']} render={() => 
          <>
            <FollowListPage users={users}/>
          </>
        }></Route>

        <Route path='/user/:id' render={() => 
          <>
            <UserPage 
              loggedInUser={user} 
              users={users}
              setLoggedInUser={setUser}
            />
          </>
        }></Route>

        <Route path='/users' render={() => 
          <>
            <UsersPage users={users}/>
          </>
        }></Route>

        <Route exact path="/login" render={({history}) => 
          <>
            <LoginPage 
              history={history}
              handleSignupOrLogin={handleSignupOrLogin}
              determineError={determineError}
            />
          </>
        }></Route>

        <Route exact path="/signup" render={({history}) => 
          <>
            <SignupPage 
              history={history}
              handleSignupOrLogin={handleSignupOrLogin}
              determineError={determineError}
            />
          </>
        }></Route>

        <Route exact path='/forgot' render={() => 
          <>
            <ForgotPasswordPage 
              determineError={determineError}
            />
          </>
        }></Route>

        <Route path='/resetpassword/:token' render={() => 
          <>
            <ResetPasswordPage 
              determineError={determineError}
            />
          </>
        }></Route>
      </Switch>
    </>
  );
};

export default App;