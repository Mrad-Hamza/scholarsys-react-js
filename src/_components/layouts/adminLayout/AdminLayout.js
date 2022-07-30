import React from 'react';
// Import Component
import { Sidebar, Header, Footer } from '../../../_components';

class AdminLayout extends React.Component {
    render() {
        return (
            <div className="main-wrapper">
                <Sidebar/>
                <div>
                    <Header />
                    <div className="page-wrapper">
                        <div className="content container-fluid">
                            {this.props.children}
                        </div>
                        <Footer />
                    </div>                    
                </div>
            </div>
        )
    }
}
export { AdminLayout };