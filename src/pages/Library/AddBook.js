import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class AddBook extends React.Component {
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
                            <h3 className="page-title">Add Books</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/library">Library</a></li>
                                <li className="breadcrumb-item active">Add Books</li>
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
                                            <h5 className="form-title"><span>Book Information</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Book ID</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Book Name</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Language</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Select Language</option>
                                                    <option>English</option>
                                                    <option>Turkish</option>
                                                    <option>Chinese</option>
                                                    <option>Spanish</option>
                                                    <option>Arabic</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Department</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Class</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Select Class</option>
                                                    <option>LKG</option>
                                                    <option>UKG</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                    <option>10</option>
                                                    <option>11</option>
                                                    <option>12</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Type</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Select Type</option>
                                                    <option>Book</option>
                                                    <option>DVD</option>
                                                    <option>CD</option>
                                                    <option>Newspaper</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Select Status</option>
                                                    <option>In Stock</option>
                                                    <option>Out of Stock</option>
                                                </Form.Control>
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
export { AddBook };