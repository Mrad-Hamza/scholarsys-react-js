import React from 'react';
// Import Components
import { Row, Col } from "react-bootstrap";

class BlankPage extends React.Component {
    render() {
        return (
            
            <div className="main-wrapper login-body">
                <div className="page-header">
                    <Row>
                        <Col sm={12}>
                            <h3 className="page-title">Blank Page</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active">Blank Page</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col sm={12} className="mb-5">
                        Contents here
                    </Col>			
                </Row>
            </div>
        )
    }
}
export { BlankPage };