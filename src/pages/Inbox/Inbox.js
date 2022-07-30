import React from 'react';
// Import Components
import { Row, Col, Card, Dropdown } from "react-bootstrap";
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAngleLeft, faAngleRight, faDownload, faFileAlt, faFolder, faPaperclip, faPaperPlane, faSave, faStar, faSyncAlt, faTags, faTrashAlt } from '@fortawesome/fontawesome-free-solid';

class Inbox extends React.Component {
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
                            <h3 className="page-title">Inbox</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active">Inbox</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col lg={3} md={4}>
                        <div className="compose-btn">
                            <a href="/react/compose" className="btn btn-primary btn-block">
                            Compose
                            </a>
                        </div>

                        <ul className="inbox-menu">
                            <li className="active">
                                <a href="#">
                                    <FontAwesomeIcon icon={faDownload} /> Inbox <span className="mail-count">(5)</span>
                                </a>
                            </li>
                            <li>
                                <a href="#"><FontAwesomeIcon icon={faStar} /> Important</a>
                            </li>
                            <li>
                                <a href="#"><FontAwesomeIcon icon={faPaperPlane} /> Sent Mail</a>
                            </li>
                            <li>
                                <a href="#"><FontAwesomeIcon icon={faFileAlt} /> Drafts <span className="mail-count">(13)</span></a>
                            </li>
                            <li>
                                <a href="#"><FontAwesomeIcon icon={faTrashAlt} /> Trash</a>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={9} md={8}>
                        <Card>
                            <Card.Body>
                                <div className="email-header">
                                    <Row>
                                        <div className="col top-action-left">
                                            <div className="float-left d-flex">
                                                <Dropdown className="me-2">
                                                    <Dropdown.Toggle id="dropdown-custom-components">
                                                        Select
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="1">All</Dropdown.Item>
                                                        <Dropdown.Item eventKey="2">None</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="3">Read</Dropdown.Item>
                                                        <Dropdown.Item eventKey="4">Unread</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                                <Dropdown className="me-2">
                                                    <Dropdown.Toggle id="dropdown-custom-components">
                                                        Actions
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="1">Reply</Dropdown.Item>
                                                        <Dropdown.Item eventKey="2">Forward</Dropdown.Item>
                                                        <Dropdown.Item eventKey="3">Archive</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="4">Mark As Read</Dropdown.Item>
                                                        <Dropdown.Item eventKey="5">Mark As Unread</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="6">Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                                <Dropdown className="me-2">
                                                    <Dropdown.Toggle id="dropdown-custom-components">
                                                        <FontAwesomeIcon icon={faFolder} />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="1">Social</Dropdown.Item>
                                                        <Dropdown.Item eventKey="2">Forums</Dropdown.Item>
                                                        <Dropdown.Item eventKey="3">Updates</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="3">Spam</Dropdown.Item>
                                                        <Dropdown.Item eventKey="4">Trash</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="3">New</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                                <Dropdown className="me-2">
                                                    <Dropdown.Toggle id="dropdown-custom-components">
                                                        <FontAwesomeIcon icon={faTags} />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="1">Work</Dropdown.Item>
                                                        <Dropdown.Item eventKey="2">Family</Dropdown.Item>
                                                        <Dropdown.Item eventKey="3">Social</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item eventKey="3">Primary</Dropdown.Item>
                                                        <Dropdown.Item eventKey="4">Promotions</Dropdown.Item>
                                                        <Dropdown.Item eventKey="3">Forums</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                                <div className="btn-group dropdown-action mail-search">
                                                    <input type="text" placeholder="Search Messages" className="form-control search-message" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-auto top-action-right">
                                            <div className="text-end">
                                                <button type="button" title="Refresh" data-bs-toggle="tooltip" className="btn btn-white d-none d-md-inline-block me-2"><FontAwesomeIcon icon={faSyncAlt} /></button>
                                                <div className="btn-group">
                                                    <a className="btn btn-white"><FontAwesomeIcon icon={faAngleLeft} /></a>
                                                    <a className="btn btn-white"><FontAwesomeIcon icon={faAngleRight} /></a>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <span className="text-muted d-none d-md-inline-block">Showing 10 of 112 </span>
                                            </div>
                                        </div>
                                    </Row>
                                </div>

                                <div className="email-content">
                                    <div className="table-responsive">
                                        <table className="table table-inbox table-hover">
                                            <thead>
                                                <tr>
                                                <th colSpan={6}> 
                                                        <input type="checkbox" className="checkbox-all" />
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr className="unread clickable-row">
                                                    <td>
                                                        <input type="checkbox" className="checkmail" />
                                                    </td>
                                                    <td><span className="mail-important"><FontAwesomeIcon icon={faStar} className="starred" /></span></td>
                                                    <td className="name">John Doe</td>
                                                    <td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
                                                    <td><FontAwesomeIcon icon={faPaperclip} /></td>
                                                    <td className="mail-date">13:14</td>
                                                </tr>
                                                <tr className="unread clickable-row">
                                                    <td>
                                                        <input type="checkbox" className="checkmail" />
                                                    </td>
                                                    <td><span className="mail-important"><FontAwesomeIcon icon={faStar} /></span></td>
                                                    <td className="name">Envato Account</td>
                                                    <td className="subject">Important account security update from Envato</td>
                                                    <td></td>
                                                    <td className="mail-date">8:42</td>
                                                </tr>
                                                <tr className="clickable-row">
                                                    <td>
                                                        <input type="checkbox" className="checkmail" />
                                                    </td>
                                                    <td><span className="mail-important"><FontAwesomeIcon icon={faStar} /></span></td>
                                                    <td className="name">Twitter</td>
                                                    <td className="subject">HRMS Bootstrap Admin Template</td>
                                                    <td></td>
                                                    <td className="mail-date">30 Nov</td>
                                                </tr>
                                                <tr className="unread clickable-row">
                                                    <td>
                                                        <input type="checkbox" className="checkmail" />
                                                    </td>
                                                    <td><span className="mail-important"><FontAwesomeIcon icon={faStar} /></span></td>
                                                    <td className="name">Richard Parker</td>
                                                    <td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
                                                    <td></td>
                                                    <td className="mail-date">18 Sep</td>
                                                </tr>
                                                <tr className="clickable-row">
                                                    <td>
                                                        <input type="checkbox" className="checkmail" />
                                                    </td>
                                                    <td><span className="mail-important"><FontAwesomeIcon icon={faStar} /></span></td>
                                                    <td className="name">John Smith</td>
                                                    <td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
                                                    <td></td>
                                                    <td className="mail-date">21 Aug</td>
                                                </tr>
                                                <tr className="clickable-row">
                                                    <td>
                                                        <input type="checkbox" className="checkmail" />
                                                    </td>
                                                    <td><span className="mail-important"><FontAwesomeIcon icon={faStar} /></span></td>
                                                    <td className="name">me, Robert Smith (3)</td>
                                                    <td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
                                                    <td></td>
                                                    <td className="mail-date">1 Aug</td>
                                                </tr>
                                                <tr className="unread clickable-row">
                                                    <td>
                                                        <input type="checkbox" className="checkmail" />
                                                    </td>
                                                    <td><span className="mail-important"><FontAwesomeIcon icon={faStar} /></span></td>
                                                    <td className="name">Codecanyon</td>
                                                    <td className="subject">Welcome To Codecanyon</td>
                                                    <td></td>
                                                    <td className="mail-date">Jul 13</td>
                                                </tr>
                                                <tr className="clickable-row">
                                                    <td>
                                                        <input type="checkbox" className="checkmail" />
                                                    </td>
                                                    <td><span className="mail-important"><FontAwesomeIcon icon={faStar} /></span></td>
                                                    <td className="name">Richard Miles</td>
                                                    <td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
                                                    <td><FontAwesomeIcon icon={faPaperclip} /></td>
                                                    <td className="mail-date">May 14</td>
                                                </tr>
                                                <tr className="unread clickable-row">
                                                    <td>
                                                        <input type="checkbox" className="checkmail" />
                                                    </td>
                                                    <td><span className="mail-important"><FontAwesomeIcon icon={faStar} /></span></td>
                                                    <td className="name">John Smith</td>
                                                    <td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
                                                    <td></td>
                                                    <td className="mail-date">11/11/16</td>
                                                </tr>
                                                <tr className="clickable-row">
                                                    <td>
                                                        <input type="checkbox" className="checkmail" />
                                                    </td>
                                                    <td><span className="mail-important"><FontAwesomeIcon icon={faStar} className="starred" /></span></td>
                                                    <td className="name">Mike Litorus</td>
                                                    <td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
                                                    <td></td>
                                                    <td className="mail-date">10/31/16</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export { Inbox };