import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

import userService from '../../services/userService'

import './UserPage.css'

const UserPage = ({loggedInUser}) => {
    const {id} = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        (async () => {
            const currentUser = await userService.getUserFromId(id)
            setUser(currentUser)
        })()
    }, [id])

    const follow = async () => {
        await userService.follow(loggedInUser._id, user._id)
        setUser({...user, followers:[...user.followers, loggedInUser]})
    }

    const unfollow = async () => {
        await userService.unfollow(loggedInUser._id, user._id)
        setUser({...user, followers:user.followers.filter(f => f._id !== loggedInUser._id)})
    }

    return (
        <div className='UserPage'>
            {user ? 
                <>
                    <h3>{user.name}</h3>
                    <br></br>
                    <p>Email: {user.email}</p>
                    {loggedInUser ? 
                        loggedInUser._id === user._id ?
                            ''
                        : user.followers.some(follower => follower._id === loggedInUser._id) ?
                        <div className='btn blue' onClick={unfollow}>Unfollow</div>
                        :<div className='btn blue' onClick={follow}>Follow</div>
                    :''}
                    <div id='follow-area'>
                        <p>Following: {user.following.length}</p>
                        <p>Followers: {user.followers.length}</p>
                    </div>
                </>
            :''}
        </div>
    )
}

export default UserPage;