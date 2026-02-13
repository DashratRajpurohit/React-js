import React from 'react'

export default function Nav(prop) {
  return (
    <div className="navbar">
        <div className="logo">
          <h1>{prop.logo}</h1>
        </div>
        <div className="link">
          <p>Home</p>
          <p>{prop.about}</p>
          <p>Contact Us</p>
        </div>
        <div className="menubar">
          <p className='bar'></p>
          <p className='bar'></p>
          <p className='bar'></p>
        </div>
      </div>
  )
}
