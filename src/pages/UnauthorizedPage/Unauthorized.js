import React from 'react'
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Unauthorized() {
    return (
        <div className="main-wrapper login-body">
            <div className="page-header">
                <Row>
                    <Col sm={12}>
                        <h3 className="page-title">Unauthorized Page. You can't access.</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item active">404 Page</li>
                        </ul>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col sm={12} className="mb-5">
                </Col>
            </Row>
        </div>
    )
}

export default Unauthorized
