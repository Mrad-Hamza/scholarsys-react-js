import React from 'react'
import { Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux/es/exports';

function Home() {
    const { user: currentUser } = useSelector((state) => state.auth);

    return (
        <div className="main-wrapper login-body">
            <div className="page-header">
                <Row>
                    <Col sm={12}>
                        <h3 className="page-title">Preskol Home Page !</h3>
                        <ul className="breadcrumb">
                        </ul>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col sm={12} className="mb-5">
                    Welcome {currentUser.email} to our school management website.
                    <br/>
                    <br/>
                    Your are logged in as a {currentUser.role}.
                </Col>
            </Row>
        </div>
    )
}

export default Home