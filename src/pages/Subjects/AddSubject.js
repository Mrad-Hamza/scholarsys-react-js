import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class AddSubject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const blockInvalidChar = e => ['+', '-'].includes(e.key) && e.preventDefault();

        return (
            <div>
                <div className="page-header">
                    <Row>
                        <Col sm={12}>
                            <h3 className="page-title">Add Subject</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/subjects">Subject</a></li>
                                <li className="breadcrumb-item active">Add Subject</li>
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
                                            <h5 className="form-title"><span>Subject Information</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Subject Name</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Niveau</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Choisir un niveau</option>	
                                                    <option>1ére</option>
                                                    <option>2éme</option>
                                                    <option>3éme</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Coefficient</Form.Label>
                                                <Form.Control type="number" min="0" onKeyDown={blockInvalidChar}
                                                 onChange={({ target: { } }) => {
                                                            this.setState(0);
                                                            }} />
                                            </Form.Group>
                                        </Col>
                                            
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Nombre d'heure</Form.Label>
                                                <Form.Control type="number" min="0" onKeyDown={blockInvalidChar}
                                                 onChange={({ target: { } }) => {
                                                            this.setState(0);
                                                            }}/>
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
export { AddSubject };