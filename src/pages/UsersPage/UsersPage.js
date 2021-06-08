import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../../services/userService'

import './UsersPage.css'

const UsersPage = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            const currentUsers = await userService.getAllUsers()
            setUsers(currentUsers)
        })()
    }, [])

    return (
        <div className='UsersPage'>
            <h3>All Users</h3>
            {users.map((currentUser) =>
                <div className='user card grey lighten-2' key={currentUser._id}>
                    <div>Name: {currentUser.name}</div>
                    <div>Email: {currentUser.email}</div>
                    <div className='user-button-area'>
                        <Link to={`/user/${currentUser._id}`} className='btn grey darken-2'>Details</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UsersPage;