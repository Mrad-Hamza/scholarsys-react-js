import React from 'react';
import {Link} from 'react-router-dom'
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
        id: 'class1',
        name: 'Data Science',
        desgniation: 'DS',
        formation: 'Data Science',
        niveau: '4eme',
        action: ''
    },
    {
        id: 'class2',
        name: 'Data Science',
        desgniation: 'DS',
        formation: 'Data Science',
        niveau: '4eme',
        action: ''
    },
    {
        id: 'class3',
        name: 'Data Science',
        desgniation: 'DS',
        formation: 'Data Science',
        niveau: '4eme',
        action: ''
    },
    {
        id: 'class4',
        name: 'Data Science',
        desgniation: 'DS',
        formation: 'Data Science',
        niveau: '4eme',
        action: ''
    },
    {
        id: 'class5',
        name: 'Data Science',
        desgniation: 'DS',
        formation: 'Data Science',
        niveau: '4eme',
        action: ''
    },
    {
        id: 'class6',
        name: 'Data Science',
        desgniation: 'DS',
        formation: 'Data Science',
        niveau: '4eme',
        action: ''
    },
];

const columns = [
    {
        name: 'Name',
        sortable: true,
        selector: row=>row.name
    },
    {
        name: 'desgniation',
        selector: row=>row.desgniation,
        sortable: true
    },
    {
        name: 'Formation',
        selector: row=>row.formation,
        sortable: true
    },
    {
        name: 'Niveau',
        selector: row=>row.niveau,
        sortable: true
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: (classes) => <div><Link to={`/edit-class/${classes.id}`} className="btn btn-sm bg-success-light me-2">
        <FontAwesomeIcon icon={faPencilAlt} /> </Link>  <a href="#" className="btn btn-sm bg-danger-light "> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];


function ClassesList() {
    
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
                                <h3 className="page-title">Classes</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Classes</li>
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
export {ClassesList};