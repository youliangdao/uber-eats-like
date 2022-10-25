import React from 'react'

const Foods = ({match}) => {
  return (
    <div>
      <h1>フード一覧</h1>
      <p>restaurantIdは{match.params.restaurantId}です</p>
    </div>
  )
}

export default Foods
