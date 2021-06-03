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
        setUser({...user, followers:[...user.followers, loggedInUser._id]})
    }

    const unfollow = () => {

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
                    <div className='follow-area'>
                        <div>{user.following.length} Following</div>
                        <div>{user.followers.length} Followers</div>
                    </div>
                </>
            :''}
        </div>  
    )
}

export default UserPage;