import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class EditTransport extends React.Component {
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
                            <h3 className="page-title">Edit Transport</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/transport">Transport</a></li>
                                <li className="breadcrumb-item active">Edit Transport</li>
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
                                            <h5 className="form-title"><span>Transport Information</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Route Name</Form.Label>
                                                <Form.Control type="text" defaultValue="New Cross" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Vehicle Number</Form.Label>
                                                <Form.Control type="text" defaultValue="TN 43 AS 5263" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Driver Name</Form.Label>
                                                <Form.Control type="text" defaultValue="Steve" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>License Number</Form.Label>
                                                <Form.Control type="text" defaultValue="REDH968532" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Contact Number</Form.Label>
                                                <Form.Control type="text" defaultValue="+91 8974158962" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Driver Address</Form.Label>
                                                <Form.Control type="text" defaultValue="152, South Pole, 2nd Street, 3rd Cross" />
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
export { EditTransport };