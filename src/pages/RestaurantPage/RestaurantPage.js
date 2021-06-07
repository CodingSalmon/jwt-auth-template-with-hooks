import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'

import userService from '../../services/userService'
import * as googleAPI from '../../services/googleApiService'

import './RestaurantPage.css'

const RestaurantPage = ({user, handleFavoriteChange}) => {
    const {placeId} = useParams()
    const [restaurant, setRestaurant] = useState(null)
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        (async () => {
            const currentRestaurant = await googleAPI.getRestaurantDetails(placeId)
            setRestaurant(currentRestaurant.data.result)
            console.log(currentRestaurant)
            let photoArray = []
            currentRestaurant.data.result.photos.forEach(async photo => {
                const newPhoto = await googleAPI.getRestaurantPhoto(photo.photo_reference)
                console.log(newPhoto)
                photoArray.push(newPhoto.data)
            })
            setPhotos(photoArray)
        })()
    }, [placeId])

    return (
        <div className='RestaurantPage'>
            {photos.map(photo => <img src={photo}/>)}
            {restaurant ?
                <>
                    <h4>{restaurant.name}</h4>
                    <br></br>
                    <a href={restaurant.url} target="_blank">{restaurant.formatted_address}</a>
                    <a href={`tel:${restaurant.international_phone_number}`}>{restaurant.international_phone_number}</a>
                    <p>Rating: {restaurant.rating}</p>
                    {user ? 
                        user.favorites.includes(placeId) ?
                            <button onClick={() => handleFavoriteChange('u', placeId)} className='btn red'>Unfavorite</button>
                        :<button onClick={() => handleFavoriteChange('f', placeId)} className='btn green'>Favorite</button>
                    :<Link to='/login'>Login to Save this Restaurant</Link>}
                    {restaurant.reviews ? 
                        restaurant.reviews.map(review => 
                            <div className='review card gray lighten-2' key={review.time}>
                                <div><img src={review.profile_photo_url} alt='profile pic'/>{review.author_name}</div>
                                <p>Rating:{review.rating}</p>
                                <p>Review:{review.text}</p>
                            </div>    
                        )
                    :''}
                </>
            :''}
        </div>  
    )
}

export default RestaurantPage;