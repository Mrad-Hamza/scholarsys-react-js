import React from 'react';
// Import Components
import { Row, Col, Card, Media, ProgressBar, Form, Button } from "react-bootstrap";

import userImg from '../../assets/img/user.jpg';

class TeacherDetails extends React.Component {
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
                            <h3 className="page-title">Teachers Details</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/teachers">Teachers</a></li>
                                <li className="breadcrumb-item active">Teachers Details</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={12}>
                                <div className="about-info">
                                    <h4>About Me</h4>

                                    <Media className="me-3 d-flex">
                                        <img src={userImg} className="me-3" alt="..." />

                                        <Media.Body>
                                            <ul>
                                                <li>
                                                    <span className="title-span">Full Name : </span>
                                                    <span className="info-span">Daisy Parks</span>
                                                </li>
                                                <li>
                                                    <span className="title-span">Department : </span>
                                                    <span className="info-span">Computer Science</span>
                                                </li>
                                                <li>
                                                    <span className="title-span">Mobile : </span>
                                                    <span className="info-span">+91 89657 48512</span>
                                                </li>
                                                <li>
                                                    <span className="title-span">Email : </span>
                                                    <span className="info-span">daisy@gmail.com</span>
                                                </li>
                                                <li>
                                                    <span className="title-span">Gender : </span>
                                                    <span className="info-span">Male</span>
                                                </li>
                                                <li>
                                                    <span className="title-span">DOB : </span>
                                                    <span className="info-span">22 Apr 1995</span>
                                                </li>
                                            </ul>
                                        </Media.Body>
                                    </Media>

                                    <Row className="mt-3">
                                        <Col md={12}>
                                            <p>Hello I am Daisy Parks. Lorem Ipsum is simply dummy text of the printing and typesetting industry, simply dummy text of the printing and typesetting industry.</p>
                                        </Col>                                            
									</Row>

                                    <Row>
                                        <Col md={4} className="mb-3">
                                            <div className="blue-box">
                                                <h3>2850</h3>
                                                <p className="mb-0">Followers</p>
                                            </div>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <div className="blue-box">
                                                <h3>2050</h3>
                                                <p className="mb-0">Following</p>
                                            </div>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <div className="blue-box">
                                                <h3>2950</h3>
                                                <p className="mb-0">Friends</p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col md={12}>
                                            <h5>Permanent Address</h5>
                                            <p>480, Estern Avenue, Courtage area, New York</p>
                                        </Col>                                            
                                    </Row>

                                    <Row className="mt-2">
                                        <Col md={12}>
                                            <h5>Present Address</h5>
                                            <p>480, Estern Avenue, Courtage area, New York</p>
                                        </Col>                                            
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col md={12}>
                                <div className="skill-info">
                                    <h4>Skills</h4>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry, simply dummy text of the printing and typesetting industry</p>

                                    <ul>
                                        <li>
                                            <label>Lorem Ipsum is simply</label>
                                            <ProgressBar animated striped variant="info" now={75} />
                                        </li>
                                        <li>
                                            <label>Lorem Ipsum is simply</label>
                                            <ProgressBar animated striped variant="success" now={69} />
                                        </li>
                                        <li>
                                            <label>Lorem Ipsum is simply</label>
                                            <ProgressBar animated striped variant="info" now={86} />
                                        </li>
                                        <li>
                                            <label>Lorem Ipsum is simply</label>
                                            <ProgressBar animated striped variant="warning" now={65} />
                                        </li>
                                    </ul>

                                    <Row className="mt-3">
                                        <Col md={12}>
                                            <h5>Education</h5>
                                            <p className="mt-3">Secondary Schooling at xyz school of secondary education, Mumbai.</p>
                                            <p>Higher Secondary Schooling at xyz school of higher secondary education, Mumbai.</p>
                                            <p>Bachelor of Science at Abc College of Art and Science, Chennai.</p>
                                            <p>Master of Science at Cdm College of Engineering and Technology, Pune.</p>
                                        </Col>                                            
                                    </Row>
                                    
                                    <Row className="mt-3">
                                        <Col md={12}>
                                            <h5>Certificates</h5>
                                            <p className="mt-3">1st Prise in Running Competition.</p>
                                            <p>Lorem Ipsum is simply dummy text.</p>
                                            <p>Won overall star student in higher secondary education.</p>
                                            <p>Lorem Ipsum is simply dummy text.</p>
                                        </Col>                                            
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col md={12}>
                                <div className="skill-info">
                                    <h4>Settings</h4>

                                    <Form>
                                        <Row>
                                            <Col xs={12} sm={6}>
                                                <Form.Group>
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control type="text" />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={6}>
                                                <Form.Group>
                                                    <Form.Label>Current Password</Form.Label>
                                                    <Form.Control type="text" />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={6}>
                                                <Form.Group>
                                                    <Form.Label>New Password</Form.Label>
                                                    <Form.Control type="text" />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Button variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                
            </div>
        )
    }
}
export { TeacherDetails };