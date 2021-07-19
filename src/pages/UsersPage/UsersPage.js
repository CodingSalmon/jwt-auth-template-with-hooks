import React from 'react'
import { Link } from 'react-router-dom'

import './UsersPage.css'

const UsersPage = ({users}) => {
    return (
        <div className='UsersPage'>
            <h3>All Users</h3>
            {users.map((currentUser) =>
                <div className='user card grey lighten-2' key={currentUser._id}>
                    <div>Name: {currentUser.name}</div>
                    <div>Email: {currentUser.email}</div>
                    <div className='user-button-area'>
                        <div>
                            <p>Following: {currentUser.following.length}</p>
                            <p>Followers: {users.filter(curUser => curUser.following.includes(currentUser._id)).length}</p>
                        </div>
                        <Link to={`/user/${currentUser._id}`} className='btn grey darken-2'>Details</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UsersPage;