import React from 'react';

class Footer extends React.Component {
	
    render() {
        const exclusionArray = [
			'/',
			'/register',
			'/forgot-password',
			'/error',
			'/blank-page'
		]
		if (exclusionArray.indexOf(this.props.location.pathname) >= 0) {
			return '';
		}
        return (
			<footer>
				<p>Copyright © 2020 Dreamguys.</p>					
			</footer>
        )
    }
}

export { Footer };