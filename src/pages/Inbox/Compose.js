import React from 'react';
// Import Components
import { Row, Col, Card } from "react-bootstrap";
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faDownload, faFileAlt, faFolder, faPaperclip, faPaperPlane, faSave, faStar, faSyncAlt, faTags, faTrashAlt } from '@fortawesome/fontawesome-free-solid';


class Compose extends React.Component {
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
                            <h3 className="page-title">Compose</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/inbox">Inbox</a></li>
                                <li className="breadcrumb-item active">Compose</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col lg={3} md={4}>
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
                                <form action="inbox.html">
                                    <div className="form-group">
                                        <input type="email" placeholder="To" className="form-control" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="email" placeholder="Cc" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="email" placeholder="Bcc" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Subject" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <textarea rows="4" className="form-control" placeholder="Enter your message here"></textarea>
                                    </div>
                                    <div className="form-group mb-0">
                                        <div className="text-center">
                                            <button className="btn btn-primary"><FontAwesomeIcon icon={faPaperPlane} className="m-r-5" /> <span>Send</span></button>
                                            <button className="btn btn-success m-l-5" type="button"> <FontAwesomeIcon icon={faSave} className="m-r-5" /> <span>Draft</span></button>
                                            <button className="btn btn-danger m-l-5" type="button"> <FontAwesomeIcon icon={faTrashAlt} className="m-r-5" /><span>Delete</span></button>
                                        </div>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export { Compose };