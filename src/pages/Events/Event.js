import React from 'react';
// Import Components
import { Row, Col } from "react-bootstrap";
// Import Calendar
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPencilAlt, faPlus, faTrash } from '@fortawesome/fontawesome-free-solid';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    clickDay = () => {
        console.log("Hello World")
    }

    render() {
        const {value, onChange} = new Date();
        return(
            <div>
                <div className="page-header">
                    <Row>
                        <Col className="col">
                            <h3 className="page-title">Events</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active">Events</li>
                            </ul>
                        </Col>
                        <Col className="col-auto text-right float-right ml-auto">
                            <a href="/add-event" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
                        </Col>
                    </Row>
                </div>

                <div>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        onClickDay={() => this.clickDay()}
                    />
                </div>
            </div>
        )
    }
}
export { Event };