import React from 'react';
// Import Components
import { Row, Col, Card, Media } from "react-bootstrap";
//Import Data Table
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPencilAlt, faPlus, faTrash } from '@fortawesome/fontawesome-free-solid';

const data = [
    { 
        id: 'PRE2309',
        name: 'Cricket',
        coach: 'Jenny',
        startedYear: '2002',
        action: ''
    },
    { 
        id: 'PRE2209',
        name: 'Cricket',
        coach: 'Jenny',
        startedYear: '2002',
        action: ''
    },
    { 
        id: 'PRE2213',
        name: 'Basketball',
        coach: 'Jenny',
        startedYear: '2002',
        action: ''
    },
    { 
        id: 'PRE2143',
        name: 'Volleyball',
        coach: 'Thomas',
        startedYear: '2006',
        action: ''
    },
    { 
        id: 'PRE2009',
        name: 'Carrom',
        coach: 'Joseph',
        startedYear: '2002',
        action: ''
    },
    { 
        id: 'PRE2431',
        name: 'Football',
        coach: 'Joseph',
        startedYear: '2002',
        action: ''
    },

    { 
        id: 'PRE1534',
        name: 'Hockey',
        coach: 'Thomas',
        startedYear: '2005',
        action: ''
    },
    { 
        id: 'PRE2153',
        name: 'Volleyball',
        coach: 'Joseph',
        startedYear: '2003',
        action: ''
    },
];

const columns = [
    {
        name: 'ID',
        selector: row=>row.id,
        sortable: true,
    },
    {
        name: 'Name',
        sortable: true,
        selector: row=>row.name,
    },
    {
        name: 'Coach',
        selector: row=>row.coach,
        sortable: true,
    },
    {
        name: 'Started Year',
        selector: row=>row.startedYear,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: () => <div className="d-flex"><a href="/edit-sport" className="btn btn-sm bg-success-light me-2">
        <FontAwesomeIcon icon={faPencilAlt} /> </a> <a href="#" className="btn btn-sm bg-danger-light"> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];

class SportsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {        
        const tableData = {
            columns,
            data,
        };
        return (
            <div>
                <div className="page-header">
                    <div className="page-header">
                        <Row>
                            <Col className="col">
                                <h3 className="page-title">Sports</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Sports</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-right ms-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-sport" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
                            </Col>
                        </Row>
                    </div>
                </div>

                <Card>
                    <DataTableExtensions
                        {...tableData}
                    >
                        <DataTable
                            noHeader
                            defaultSortField="id"
                            defaultSortAsc={false}
                            pagination
                            highlightOnHover
                        />
                    </DataTableExtensions>
                </Card>
            </div>
        )
    }
}
export { SportsList };