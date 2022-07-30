import React from 'react';
// Import Components
import { Row, Col, Card, Tabs, Tab } from "react-bootstrap";
// Import Image
import proPic from '../../assets/img/profiles/avatar-02.jpg';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

class Profile extends React.Component {
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
                            <h3 className="page-title">Profile</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col sm={12}>
                        <div className="profile-header">
                            <div className="row align-items-center">
                                <div className="col-auto profile-image">
                                    <a href="#">
                                        <img className="rounded-circle" alt="User Image" src={proPic} />
                                    </a>
                                </div>
                                <div className="col ml-md-n2 profile-user-info">
                                    <h4 className="user-name mb-0">John Doe</h4>
                                    <h6 className="text-muted">UI/UX Design Team</h6>
                                    <div className="user-Location"><FontAwesomeIcon icon={faMapMarkerAlt} /> Florida, United States</div>
                                    <div className="about-text">Lorem ipsum dolor sit amet.</div>
                                </div>
                                <div className="col-auto profile-btn">                                    
                                    <a href="" className="btn btn-primary">
                                        Edit
                                    </a>
                                </div>
                            </div>
                        </div>

                        <Tabs defaultActiveKey="about" id="uncontrolled-tab-example" className="profile-menu">
                            {/* Personal Detail Tab */}
                            <Tab eventKey="about" title="About">
                                <Row>
                                    <Col lg={9}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className="d-flex justify-content-between">
                                                    <span>Personal Details</span> 
                                                    <a className="edit-link" data-toggle="modal" href="#edit_personal_details"><FontAwesomeIcon icon={faEdit} className="mr-1" />Edit</a>
                                                </Card.Title>

                                                <div className="row">
                                                    <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Name</p>
                                                    <p className="col-sm-9">John Doe</p>
                                                </div>
                                                <div className="row">
                                                    <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Date of Birth</p>
                                                    <p className="col-sm-9">24 Jul 1983</p>
                                                </div>
                                                <div className="row">
                                                    <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Email ID</p>
                                                    <p className="col-sm-9">johndoe@example.com</p>
                                                </div>
                                                <div className="row">
                                                    <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Mobile</p>
                                                    <p className="col-sm-9">305-310-5857</p>
                                                </div>
                                                <div className="row">
                                                <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Address</p>
                                                    <p className="col-sm-9 mb-0">4663  Agriculture Lane,<br />
														Miami,<br />
														Florida - 33165,<br />
														United States.
                                                    </p>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg={3}>

                                        {/* Account Status */}
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className="d-flex justify-content-between">
                                                    <span>Account Status</span>
                                                    <a className="edit-link" href="#"><FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit</a>
                                                </Card.Title>
                                                <button className="btn btn-success" type="button"><FontAwesomeIcon icon={faCheck} className="mr-1" />Active</button>
                                            </Card.Body>
                                        </Card>
                                        {/* /Account Status */}

                                        {/* Skills */}
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className="d-flex justify-content-between">
                                                    <span>Skills</span>
                                                    <a className="edit-link" href="#"><FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit</a>
                                                </Card.Title>
                                                <div className="skill-tags">
                                                    <span>Html5</span>
                                                    <span>CSS3</span>
                                                    <span>WordPress</span>
                                                    <span>Javascript</span>
                                                    <span>Android</span>
                                                    <span>iOS</span>
                                                    <span>Angular</span>
                                                    <span>PHP</span>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        {/* Skills */}
                                    </Col>
                                </Row>
                            </Tab>
                            {/* Personal Detail Tab */}


                            {/* Password Tab */}
                            <Tab eventKey="password" title="Password">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Change Password</Card.Title>
                                        <Row>
                                            <Col md={10} lg={6}>
                                                <form>
                                                    <div className="form-group">
                                                        <label>Old Password</label>
                                                        <input type="password" className="form-control" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>New Password</label>
                                                        <input type="password" className="form-control" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Confirm Password</label>
                                                        <input type="password" className="form-control" />
                                                    </div>
                                                    <button className="btn btn-primary" type="submit">Save Changes</button>
                                                </form>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Tab>
                            {/* Password Tab */}
                        </Tabs>                        
                    </Col>
                </Row>
            </div>
        )
    }
}
export { Profile };