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
        id: 'PRE2209',
        name: 'Computer Science Engg',
        acronyme: 'Aaliyah',
        matiere: '1995',
        formation: '180',
        action: ''
    },
    {
        id: 'PRE2209',
        name: 'Computer Science Engg',
        acronyme: 'Aaliyah',
        matiere: '1995',
        formation: '180',
        action: ''
    },
    {
        id: 'PRE2209',
        name: 'Computer Science Engg',
        acronyme: 'Aaliyah',
        matiere: '1995',
        formation: '180',
        action: ''
    },
    {
        id: 'PRE2209',
        name: 'Computer Science Engg',
        acronyme: 'Aaliyah',
        matiere: '1995',
        formation: '180',
        action: ''
    },
    {
        id: 'PRE2209',
        name: 'Computer Science Engg',
        acronyme: 'Aaliyah',
        matiere: '1995',
        formation: '180',
        action: ''
    },
    {
        id: 'PRE2209',
        name: 'Computer Science Engg',
        acronyme: 'Aaliyah',
        matiere: '1995',
        formation: '180',
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
        name: 'Acronyme',
        selector: row=>row.acronyme,
        sortable: true,
    },
    {
        name: 'Matiere',
        selector: row=>row.matiere,
        sortable: true,
    },
    {
        name: 'Formation',
        selector: row=>row.formation,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: (level) => <div><Link to={`/edit-level/${level.id}`} className="btn btn-sm bg-success-light me-2">
        <FontAwesomeIcon icon={faPencilAlt} /> </Link>  <a href="#" className="btn btn-sm bg-danger-light "> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];


function LevelsList () {
         
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
                                <h3 className="page-title">Levels</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Levels</li>
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
    
export { LevelsList };