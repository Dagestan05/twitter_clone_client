import React from 'react'
import { Link } from 'react-router-dom';

const Homepage = ({currentUser}) => {
  if(!currentUser.isAuthenticated){
    return (
      <div className="home-hero">
        <h1>Whats up</h1>
        <h4>New here?</h4>
        <Link to="/signup" className="btn btn-primary">Sign up here</Link>
      </div>
    )
  }
  return <div>You logged in successfully</div>
}

export default Homepage
