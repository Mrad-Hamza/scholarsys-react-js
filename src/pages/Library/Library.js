import React from 'react';
// Import Components
import { Row, Col, Card } from "react-bootstrap";
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
        name: 'Acoustics',
        language: 'English',
        department: 'Science',
        class: '10',
        type: 'Book',
        status: '',
        action: ''
    },
    { 
        id: 'PRE2209',
        name: 'Acoustics',
        language: 'Geometry',
        department: 'Science',
        class: '8',
        type: 'Book',
        status: '',
        action: ''
    },
    { 
        id: 'PRE2213',
        name: 'Games',
        language: 'English',
        department: 'General',
        class: '9',
        type: 'Book',
        status: '',
        action: ''
    },
    { 
        id: 'PRE2143',
        name: 'Chess',
        language: 'English',
        department: 'General',
        class: '7',
        type: 'Book',
        status: '',
        action: ''
    },
    { 
        id: 'PRE2009',
        name: 'Calculus',
        language: 'English',
        department: 'Mathematics',
        class: '9',
        type: 'Book',
        status: '',
        action: ''
    },
    { 
        id: 'PRE2431',
        name: 'Visual Basic',
        language: 'English',
        department: 'Computer Science',
        class: '11',
        type: 'Book',
        status: '',
        action: ''
    },
    { 
        id: 'PRE1534',
        name: 'Acoustics',
        language: 'English',
        department: 'Science',
        class: '10',
        type: 'Book',
        status: '',
        action: ''
    },
    { 
        id: 'PRE2153',
        name: 'Robotics',
        language: 'English',
        department: 'Science',
        class: '10',
        type: 'Book',
        status: '',
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
        name: 'Language',
        selector: row=>row.language,
        sortable: true,
    },
    {
        name: 'Department',
        selector: row=>row.department,
        sortable: true,
    },
    {
        name: 'Class',
        selector: row=>row.class,
        sortable: true,
    },
    {
        name: 'Type',
        selector: row=>row.type,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row=>row.status,
        sortable: true,
        cell: () => <span className="badge badge-success">In Stock</span>
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: () => <div className="d-flex"><a href="/edit-book" className="btn btn-sm bg-success-light me-2">
        <FontAwesomeIcon icon={faPencilAlt} /> </a> <a href="#" className="btn btn-sm bg-danger-light"> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];

class Library extends React.Component {
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
                                <h3 className="page-title">Library</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Library</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-endfloat-right ms-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-book" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { Library };