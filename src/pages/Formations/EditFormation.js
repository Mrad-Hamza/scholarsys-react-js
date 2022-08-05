import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

function EditFormation() {

    const handleChange = () =>{

    }

    const handleSubmit = () =>{

    }

        return (
            <div>
                <div className="page-header">
                    <Row>
                        <Col sm={12}>
                            <h3 className="page-title">Add Formations</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/formations">Formation</a></li>
                                <li className="breadcrumb-item active">Add Formation</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit= {handleSubmit}>
                                    <Row>
                                        <Col sm={12}>
                                            <h5 className="form-title"><span>Formation Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Formation Name</Form.Label>
                                                <Form.Control type="text" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Montant Annuelle</Form.Label>
                                                <Form.Control type="text" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Duree Annuelle</Form.Label>
                                                <Form.Control type="number" min="0" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>    
                                                <Form.Label>Duree Mensuelle</Form.Label>
                                                <Form.Control type="number" min="0" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Date d'écheance</Form.Label>
                                                <Form.Control type="date" onChange={handleChange} />
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
export { EditFormation };