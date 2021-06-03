import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

import * as googleAPI from '../../services/googleApiService'

import './RestaurantPage.css'

const RestaurantPage = ({user}) => {
    const {placeId} = useParams()
    const [restaurant, setRestaurant] = useState(null)

    useEffect(() => {
        (async () => {
            const currentRestaurant = await googleAPI.getRestaurantDetails(placeId)
            setRestaurant(currentRestaurant.data.result)
        })()
    }, [placeId])

    const favorite = () => {

    }

    const unfavorite = () => {

    }

    return (
        <div className='RestaurantPage'>
            {restaurant ?
                <>
                    <h4>{restaurant.name}</h4>
                    <br></br>
                    <p>Address: {restaurant.formatted_address}</p>
                    <p>Rating: {restaurant.rating}</p>
                    {restaurant.reviews ? 
                        restaurant.reviews.map(review => 
                            <div className='review card gray lighten-2' key={review.time}>
                                <div><img src={review.profile_photo_url} alt='profile pic'/>{review.author_name}</div>
                                <p>Rating:{review.rating}</p>
                                <p>Review:{review.text}</p>
                            </div>    
                        )
                    :''}
                    {user ? 
                        user.favorites.includes(placeId) ?
                            <button onClick={unfavorite} className='btn red'>Unfavorite</button>
                        :<button onClick={favorite} className='btn green'>Favorite</button>
                    :''}
                </>
            :''}
        </div>  
    )
}

export default RestaurantPage;