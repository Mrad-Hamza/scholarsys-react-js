import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class EditTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <Row>
                        <Col sm={12}>
                            <h3 className="page-title">Edit Teacher</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/teachers">Teacher</a></li>
                                <li className="breadcrumb-item active">Edit Teacher</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col sm={12}>
                                            <h5 className="form-title"><span>Basic Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Teacher ID</Form.Label>
                                                <Form.Control type="text" defaultValue="PRE1234" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" defaultValue="Vincent" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Others</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Date of Birth</Form.Label>
                                                <Form.Control type="date" defaultValue="23 Jun 1985" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Mobile Number</Form.Label>
                                                <Form.Control type="text" defaultValue="077 3499 9959" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Joining Date</Form.Label>
                                                <Form.Control type="date" defaultValue="16 Jul 2015" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Qualification</Form.Label>
                                                <Form.Control type="text" defaultValue="Bachelor of Engineering" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Experience</Form.Label>
                                                <Form.Control type="text" defaultValue="5" />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <h5 className="form-title"><span>Login Details</span></h5>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="text" defaultValue="Vincent" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Email ID</Form.Label>
                                                <Form.Control type="email" defaultValue="vincent20@gmail.com" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="text" defaultValue="vincent" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Repeat Password</Form.Label>
                                                <Form.Control type="text" defaultValue="vincent" />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <h5 className="form-title"><span>Address</span></h5>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Group>
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control type="text" defaultValue="3979 Ashwood Drive" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>City</Form.Label>
                                                <Form.Control type="text" defaultValue="Omaha" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>State</Form.Label>
                                                <Form.Control type="text" defaultValue="Omaha" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Zip Code</Form.Label>
                                                <Form.Control type="text" defaultValue="3979" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control type="text" defaultValue="USA" />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Col>                                        
                                    </Row>                                    
                                </Form>                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export { EditTeacher };