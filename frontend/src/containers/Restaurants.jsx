import React from 'react'
import { useEffect } from 'react'
import { fetchRestaurants } from '../apis/restaurants'

const Restaurants = () => {
  useEffect(() => {
    fetchRestaurants().then(data => {
      console.log(data)
    })
  }, [])
  return (
    <div>Restaurants</div>
  )
}

export default Restaurants
