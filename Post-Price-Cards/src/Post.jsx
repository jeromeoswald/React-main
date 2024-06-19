import React from 'react'
import './Post.css'

function Post(props) {

  return (
   <div className= {props.className}>
    <div className="card">
          <div className="card-header">
            <h3>{props.name}</h3>
          </div>
          <div className="card-body">
            <h2>{props.Pricing}</h2>
            <p>{props.Listing}</p>
            <p>{props.Matches}</p>
            <p>{props.Messages}</p>
            <p>{props.AppUsage}</p>
            <button class="btn btn-lg btn-block btn-dark" type="button">Sign Up</button>
          </div>
        </div>
   </div>
  )
}

export default Post