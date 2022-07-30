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
        id: 'PRE2209',
        name: 'Mathematics',
        class: '5',
        action: ''
    },
    {
        id: 'PRE2213',
        name: 'History',
        class: '6',
        action: ''
    },
    {
        id: 'PRE2143',
        name: 'Science',
        class: '3',
        action: ''
    },
    {
        id: 'PRE2431',
        name: 'Geography',
        class: '8',
        action: ''
    },
    {
        id: 'PRE1534',
        name: 'Botony',
        class: '9',
        action: ''
    },
    {
        id: 'PRE2153',
        name: 'English',
        class: '4',
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
        selector: row=>row.name
    },
    {
        name: 'Class',
        selector: row=>row.class,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: () => <div><a href="/edit-subject" className="btn btn-sm bg-success-light me-2">
        <FontAwesomeIcon icon={faPencilAlt} /> </a> <a href="#" className="btn btn-sm bg-danger-light"> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];

class SubjectsList extends React.Component {
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
                                <h3 className="page-title">Subjects</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Subjects</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-right ms-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-subject" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { SubjectsList };