import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookF,faGooglePlusG,faLinkedinIn } from '@fortawesome/free-brands-svg-icons' 

function Signin() {

    library.add(faFacebookF,faGooglePlusG,faLinkedinIn);


    return (
        <div className="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <div className="social-container">
                    <a href="#" className="social"><i><FontAwesomeIcon icon={['fab','facebook-f']} /></i></a>
                    <a href="#" className="social"> <i><FontAwesomeIcon icon={['fab','google-plus-g']} /></i></a>
                    <a href="#" className="social"> <i><FontAwesomeIcon icon={['fab','linkedin-in']}/></i></a>
                </div>
                <span>or use your account</span>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
    )
}

export default Signin;
