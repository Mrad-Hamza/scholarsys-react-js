import React from 'react';

class LoginLayout extends React.Component {
    render() {
        return (
            <div className="main-wrapper login-body">
                {this.props.children}
            </div>
        )
    }
}
export { LoginLayout };