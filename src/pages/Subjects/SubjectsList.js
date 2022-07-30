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
        name: 'Mathematics',
        niveau: '5',
        coefficient: '3',
        nbHeure :'42'
    },
    {
        id: 'PRE2209',
        name: 'Machine Learning',
        niveau: '5',
        coefficient: '7',
        nbHeure :'42'
    },
    {
        id: 'PRE2209',
        name: 'TLA',
        niveau: '5',
        coefficient: '3',
        nbHeure :'42'
    },
    {
        id: 'PRE2209',
        name: 'Francais',
        niveau: '5',
        coefficient: '1',
        nbHeure :'21'
    },
    {
        id: 'PRE2209',
        name: 'ReactJS',
        niveau: '5',
        coefficient: '3',
        nbHeure :'21'
    },
    {
        id: 'PRE2209',
        name: 'Big Data',
        niveau: '5',
        coefficient: '5',
        nbHeure :'42'
    },
];

const columns = [
    {
        name: 'Name',
        sortable: true,
        selector: row=>row.name
    },
    {
        name: 'Niveau',
        selector: row=>row.niveau,
        sortable: true,
    },
    {
        name: 'Coefficient',
        selector: row=>row.coefficient,
        sortable: true,
    },
    {
        name: 'Nombre Dheure',
        selector: row=>row.nbHeure,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: (subject) => <div><Link to={`/edit-subject/${subject.id}`} className="btn btn-sm bg-success-light me-2">
        <FontAwesomeIcon icon={faPencilAlt} /> </Link> <a href="#" className="btn btn-sm bg-danger-light"> <FontAwesomeIcon icon={faTrash} /> </a></div>
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