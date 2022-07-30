import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class EditDepartment extends React.Component {
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
                            <h3 className="page-title">Edit Department</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/departments">Department</a></li>
                                <li className="breadcrumb-item active">Edit Department</li>
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
                                            <h5 className="form-title"><span>Department Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Department ID</Form.Label>
                                                <Form.Control type="text" defaultValue="PRE1534" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Department Name</Form.Label>
                                                <Form.Control type="text" defaultValue="MCA" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Head of Department</Form.Label>
                                                <Form.Control type="text" defaultValue="Lois A" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Department Start Date</Form.Label>
                                                <Form.Control type="date" defaultValue="1992" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>No of Students</Form.Label>
                                                <Form.Control type="text" defaultValue="200" />
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
export { EditDepartment };