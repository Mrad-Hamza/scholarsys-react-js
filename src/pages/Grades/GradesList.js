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
        type: 'EXAM1',
        formation: 'Data Science',
        niveau: '4éme',
        matiere: 'TLA',
        class: '4DS1',
        etudiant: 'Louay',
        prof:'Foulen',
        date: '12/10/2022',
        action: ''
    },
    {
        id: 'PRE2209',
        type: 'EXAM1',
        formation: 'Data Science',
        niveau: '4éme',
        matiere: 'TLA',
        class: '4DS1',
        etudiant: 'Louay',
        prof:'Foulen',
        date: '12/10/2022',
        action: ''
    },
    {
        id: 'PRE2209',
        type: 'EXAM1',
        formation: 'Data Science',
        niveau: '4éme',
        matiere: 'TLA',
        class: '4DS1',
        etudiant: 'Louay',
        prof:'Foulen',
        date: '12/10/2022',
        action: ''
    },
    {
        id: 'PRE2209',
        type: 'EXAM1',
        formation: 'Data Science',
        niveau: '4éme',
        matiere: 'TLA',
        class: '4DS1',
        etudiant: 'Louay',
        prof:'Foulen',
        date: '12/10/2022',
        action: ''
    },
    {
        id: 'PRE2209',
        type: 'EXAM1',
        formation: 'Data Science',
        niveau: '4éme',
        matiere: 'TLA',
        class: '4DS1',
        etudiant: 'Louay',
        prof:'Foulen',
        date: '12/10/2022',
        action: ''
    },
    {
        id: 'PRE2209',
        type: 'EXAM1',
        formation: 'Data Science',
        niveau: '4éme',
        matiere: 'TLA',
        class: '4DS1',
        etudiant: 'Louay',
        prof:'Foulen',
        date: '12/10/2022',
        action: ''
    }
];

const columns = [
    {
        name: 'Type',
        sortable: true,
        selector: row=>row.type
    },
    {
        name: 'Formation',
        selector: row=>row.formation,
        sortable: true,
    },
    {
        name: 'Level',
        selector: row=>row.niveau,
        sortable: true,
    },
    {
        name: 'Subject',
        selector: row=>row.matiere,
        sortable: true,
    },
    {
        name: 'Class',
        selector: row=>row.class,
        sortable: true,
    },
    {
        name: 'Etudiant',
        selector: row=>row.etudiant,
        sortable: true,
    },
    {
        name: 'Prof',
        selector: row=>row.prof,
        sortable: true,
    },
    {
        name: 'Date de passation',
        selector: row=>row.date,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: (grade) => <div><Link to={`/edit-grade/${grade.id}`} className="btn btn-sm bg-success-light me-2">
        <FontAwesomeIcon icon={faPencilAlt} /> </Link>  <a href="#" className="btn btn-sm bg-danger-light "> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];


class GradesList extends React.Component {
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
                                <h3 className="page-title">Grades</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Grades</li>
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
export { GradesList };