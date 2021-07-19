import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import userService from '../../services/userService'

import './FollowListPage.css'

const FollowListPage = ({users}) => {
    const [followList, setFollowList] = useState([])
    
    const {id} = useParams()
    const {pathname} = useLocation()
    
    useEffect(() => {
        (async () => {
            let newFollowList
            if(pathname.includes('followers')) {
                newFollowList = await userService.getFollowList(id, 'followers')
            }
            if(pathname.includes('following')) {
                newFollowList = await userService.getFollowList(id, 'following')
            }
            setFollowList(newFollowList)
        })()
    }, [id, pathname])

    return (
        <div className='FollowListPage'>
            <h3>{pathname.includes('followers') ? `Followers of ${id}`: `${id} Follows`}</h3>
            {followList.map((currentUser) =>
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

export default FollowListPage;