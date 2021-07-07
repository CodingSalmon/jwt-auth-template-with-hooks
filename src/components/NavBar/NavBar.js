import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import {Dropdown, Icon} from 'react-materialize'
import './NavBar.css'

const NavBar = ({ user, handleLogout }) => {

  const [windowIsWide, setWindowIsWide] = useState(window.innerWidth > 1000)

  const updateState = () => {
    setWindowIsWide(window.innerWidth > 1000)
  }

  useEffect(() => {
    window.addEventListener('resize', updateState)

  })
  
  return (
    <nav>
      <ul className="right">
        <li>
          <Link to={`/users`}>All Users</Link>
        </li>

        {windowIsWide ? 
          user ? 
            <>
              <li>
                <Link to={`/user/${user._id}`}>Welcome, {user.name}</Link>
              </li>
              <li>
                <Link to=" " onClick={handleLogout}>Log Out</Link>
              </li>
            </>
            :
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          :
          <Dropdown 
            trigger={
              <li>
                <Link to='#'><Icon>menu</Icon></Link>
              </li>}
            options={{
              coverTrigger: false,
              constrainWidth: false,
            }}
          >
            {user ?
              <ul className='dropdownMenu'>
                <li>
                    <Link className='white-text' to={`/user/${user._id}`}>Welcome, {user.name}</Link>
                </li>
                <li>
                    <Link className='white-text' to=" " onClick={handleLogout}>Log Out</Link>
                </li>
              </ul>
              :
              <ul className='dropdownMenu'>
                <li>
                  <Link className='white-text' to="/login">Log In</Link>
                </li>
                <li>
                  <Link className='white-text' to="/signup">Sign Up</Link>
                </li>
              </ul>
            }
          </Dropdown>
        }
      </ul>
    </nav>
  );
};

export default NavBar;