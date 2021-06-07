import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';

import NavBar from "../../components/NavBar/NavBar";

import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import ForgotPasswordPage from '../ForgotPasswordPage/ForgotPasswordPage'
import ResetPasswordPage from '../ResetPasswordPage/ResetPasswordPage'
import UserPage from '../UserPage/UserPage'
import UsersPage from '../UsersPage/UsersPage'
import SearchPage from '../SearchPage/SearchPage'
import RestaurantPage from '../RestaurantPage/RestaurantPage'

import userService from '../../services/userService';

import "./App.css";

const App = () => {
  const [user, setUser] = useState('');

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

  const handleFavoriteChange = async (type, id) => {
    if(type === 'f') {
      const newUser = await userService.favorite(id)
      setUser(newUser)
    }
    if(type === 'u') {
      const newUser = await userService.unfavorite(id)
      setUser(newUser)
    }
  } 

  useEffect(() => {
    setUser(userService.getUser())
  },[])

  return (
    <>
      <NavBar 
        user={user}
        handleLogout={handleLogout}
      />

      <Switch>
        <Route path='/search' render={() => 
          <>
            <SearchPage />
          </>
        }></Route>

        <Route path='/restaurant/:placeId' render={() => 
          <>
            <RestaurantPage user={user} handleFavoriteChange={handleFavoriteChange}/>
          </>
        }></Route>

        <Route path='/user/:id' render={() => 
          <>
            <UserPage loggedInUser={user}/>
          </>
        }></Route>

        <Route path='/users' render={() => 
          <>
            <UsersPage />
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