import React from 'react'

function OverlayRight() {
    const showSignUp =(e)=> {
        
        document.getElementById('container').classList.add("right-panel-active")
    }
    return (
        <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={showSignUp}>Sign Up</button>
        </div>
    )
}

export default OverlayRight;