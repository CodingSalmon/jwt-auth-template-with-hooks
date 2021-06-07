import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'

import userService from '../../services/userService'
import * as googleAPI from '../../services/googleApiService'

import './UserPage.css'

const UserPage = ({loggedInUser}) => {
    const {id} = useParams()
    const [user, setUser] = useState(null)
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        (async () => {
            const currentUser = await userService.getUserFromId(id)
            setUser(currentUser)
            currentUser.favorites.forEach(async placeId => {
                const favorite = await googleAPI.getRestaurantDetails(placeId)
                setFavorites([...favorites, favorite])
            })
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
                    <h4>Favorites</h4>
                    <div id='restuarants'>
                        {favorites.length ? 
                            favorites.map(result => 
                                <div className='restaurant card grey lighten-2' key={result.data.result.place_id}>
                                    <div>Name: {result.data.result.name}</div>
                                    <div>Address: {result.data.result.formatted_address}</div>
                                    <div className='user-button-area'>
                                        <Link to={`/restaurant/${result.data.result.place_id}`} className='btn grey darken-2'>Details</Link>
                                    </div>
                                </div> 
                            )
                        :''}
                    </div>
                </>
            :''}
        </div>  
    )
}

export default UserPage;