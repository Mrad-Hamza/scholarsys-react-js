import React from 'react';

class Error extends React.Component {
    render() {
        return (
            
            <div className="main-wrapper login-body">
            <div className="error-box">
				<h1>404</h1>
				<h3 className="h2 mb-3"><i className="fas fa-exclamation-triangle"></i> Oops! Page not found!</h3>
				<p className="h4 font-weight-normal">The page you requested was not found.</p>
				<a href="/dashboard" className="btn btn-primary">Back to Home</a>
			</div></div>
        )
    }
}
export { Error };