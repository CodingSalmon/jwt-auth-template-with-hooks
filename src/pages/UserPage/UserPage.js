import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import userService from '../../services/userService'

import './UserPage.css'

const UserPage = () => {
    const {id} = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        (async () => {
            const currentUser = await userService.getUserFromId(id)
            setUser(currentUser)
        })()
    }, [id])

    return (
        <div className='UserPage'>
            <h3>{user.name}</h3>
            <br></br>
            <p>Email: {user.email}</p>
        </div>
    )
}

export default UserPage;