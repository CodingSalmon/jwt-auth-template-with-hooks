import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import * as googleAPI from '../../services/googleApiService'

import './SearchPage.css'

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [restaurants, setRestaurants] = useState('')
    const [isLoading, setIsLoading] = useState(null)

    const handleChange = (e) => setSearchTerm(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const results = await googleAPI.search(searchTerm)
        results.data.results.sort((a, b) => b.rating - a.rating)
        setRestaurants(results.data.results)
        setIsLoading(false)
    }
    return (
        <div className="SearchPage">
            <form
                className='search'
                onSubmit={handleSubmit}
            >
                <input
                    value={searchTerm}
                    onChange={handleChange}
                    type="search"
                    placeholder="Search for restaurants..."
                    required
                    autoFocus
                />
                <button type="submit" className="btn">Search</button>
            </form>
            <div id='restaurants'>
                {isLoading !== null ? 
                    isLoading ? 
                        <img className='loading' src='https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif'></img>
                    :restaurants.map(restaurant => 
                        <div className='restaurant card grey lighten-2' key={restaurant.place_id}>
                            <div>Name: {restaurant.name}</div>
                            <div>Address: {restaurant.formatted_address}</div>
                            <div className='user-button-area'>
                                <Link to={`/restaurant/${restaurant.place_id}`} className='btn grey darken-2'>Details</Link>
                            </div>
                        </div>
                    )
                :''}
            </div>
        </div>
    )
}
