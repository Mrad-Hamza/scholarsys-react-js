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
        name: 'Computer Science Engg',
        hod: 'Aaliyah',
        startedYear: '1995',
        noStudents: '180',
        action: ''
    },
    {
        id: 'PRE2213',
        name: 'Mechanical Engg',
        hod: 'Malynne',
        startedYear: '1999',
        noStudents: '240',
        action: ''
    },
    {
        id: 'PRE2143',
        name: 'Electrical Engg',
        hod: 'Levell Scott',
        startedYear: '1994',
        noStudents: '163',
        action: ''
    },
    {
        id: 'PRE2431',
        name: 'Civil Engg',
        hod: 'Minnie',
        startedYear: '2000',
        noStudents: '195',
        action: ''
    },
    {
        id: 'PRE1534',
        name: 'MCA',
        hod: 'Lois A',
        startedYear: '1992',
        noStudents: '200',
        action: ''
    },
    {
        id: 'PRE2153',
        name: 'BCA',
        hod: 'Calvin',
        startedYear: '1992',
        noStudents: '152',
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
        name: 'HOD',
        selector: row=>row.hod,
        sortable: true,
    },
    {
        name: 'Started Year',
        selector: row=>row.startedYear,
        sortable: true,
    },
    {
        name: 'No of Students',
        selector: row=>row.noStudents,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: () => <div><a href="/edit-department" className="btn btn-sm bg-success-light me-2 ">
        <FontAwesomeIcon icon={faPencilAlt} /> </a> <a href="#" className="btn btn-sm bg-danger-light "> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];


class DepartmentsList extends React.Component {
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
                                <h3 className="page-title">Departments</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Departments</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-end ms-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-department" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { DepartmentsList };