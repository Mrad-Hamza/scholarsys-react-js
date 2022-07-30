import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class EditSport extends React.Component {
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
                            <h3 className="page-title">Edit Sports</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/sports">Sports</a></li>
                                <li className="breadcrumb-item active">Edit Sports</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <Form>s
                                    <Row>
                                        <Col sm={12}>
                                            <h5 className="form-title"><span>Sports Information</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Sports ID</Form.Label>
                                                <Form.Control type="text"  defaultValue="PRE1534" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Sports Name</Form.Label>
                                                <Form.Control type="text" defaultValue="Hockey" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Coach Name</Form.Label>
                                                <Form.Control type="text" defaultValue="Joseph" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Started Year</Form.Label>
                                                <Form.Control type="text" defaultValue="2005" />
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
export { EditSport };