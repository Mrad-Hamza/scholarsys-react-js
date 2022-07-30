import React from 'react';
// Import Logo
import Logo from '../../assets/img/logo-white.png';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

class Register extends React.Component {
    render() {
        return (
            <div className="main-wrapper login-body">
            <div className="login-wrapper">
                <div className="container">
                	<div className="loginbox">
                    	<div className="login-left">
							<img className="img-fluid" src={Logo} alt="Logo" />
                        </div>
                        <div className="login-right">
							<div className="login-right-wrap">
								<h1>Register</h1>
								<p className="account-subtitle">Access to our dashboard</p>							
								
								<form>
									<div className="form-group">
										<input className="form-control" type="text" placeholder="Name" />
									</div>
									<div className="form-group">
										<input className="form-control" type="text" placeholder="Email" />
									</div>
									<div className="form-group">
										<input className="form-control" type="text" placeholder="Password" />
									</div>
									<div className="form-group">
										<input className="form-control" type="text" placeholder="Confirm Password" />
									</div>
									<div className="form-group mb-0">
										<a href="/react" className="btn btn-primary btn-block">
											Register
										</a>										
									</div>
								</form>
								
								
								<div className="login-or">
									<span className="or-line"></span>
									<span className="span-or">or</span>
								</div>
								
								
								<div className="social-login">
									<span>Register with</span>
									<a href="#" className="facebook"><FontAwesomeIcon icon={faFacebookF} /></a><a href="#" className="google"><FontAwesomeIcon icon={faGoogle} /></a>
								</div>
								
								
								<div className="text-center dont-have">Already have an account? <a href="/react/">Login</a></div>
							</div>
                        </div>
                    </div>
                </div>
            </div></div>
        )
    }
}
export { Register };