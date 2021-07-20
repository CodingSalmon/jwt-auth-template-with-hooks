import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'

import userService from '../../services/userService'

import './UserPage.css'

const UserPage = ({loggedInUser, setLoggedInUser, users}) => {
    const {id} = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        (async () => {
            const currentUser = await userService.getUserFromId(id)
            setUser(currentUser)
        })()
    }, [id])
    
    const follow = async () => {
        await userService.handleFollow(loggedInUser._id, user._id)
        setLoggedInUser({...loggedInUser, following: [...loggedInUser.following, user._id]})
    }

    const unfollow = async () => {
        await userService.handleFollow(loggedInUser._id, user._id)
        setLoggedInUser({...loggedInUser, following: loggedInUser.following.filter(f => f !== user._id)})
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
                        : loggedInUser.following.includes(user._id) ?
                        <div className='btn blue' onClick={unfollow}>Unfollow</div>
                        :<div className='btn blue' onClick={follow}>Follow</div>
                    :''}
                    <div id='follow-area'>
                        <p><Link to={`/user/${user._id}/following`}>Following: {user.following.length}</Link></p>
                        <p>
                            <Link to={`/user/${user._id}/followers`}>Followers: 
                                {loggedInUser ? 
                                // Check if loggedInUser Follows User who's page we are on
                                    users.filter(curUser => curUser.following.includes(user._id)).some(u => u._id === loggedInUser._id) ? 
                                    // Recalculate if user has followed after page load
                                        loggedInUser.following.includes(user._id) ? 
                                            users.filter(curUser => curUser.following.includes(user._id)).length
                                            : --users.filter(curUser => curUser.following.includes(user._id)).length
                                    // Recalculate if user has followed after page load
                                    : loggedInUser.following.includes(user._id) ? 
                                        ++users.filter(curUser => curUser.following.includes(user._id)).length
                                        : users.filter(curUser => curUser.following.includes(user._id)).length
                                :users.filter(curUser => curUser.following.includes(user._id)).length
                                }
                            </Link>
                        </p>
                    </div>
                </>
            :''}
        </div>
    )
}

export default UserPage;