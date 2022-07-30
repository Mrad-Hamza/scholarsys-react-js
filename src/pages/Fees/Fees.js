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
        feesName: 'Exam Fees',
        class: '10',
        amount: '$345',
        startDate: '23 Apr 2020',
        endDate: '28 Apr 2020',
        action: ''
    },
    { 
        id: 'PRE2213',
        feesName: 'Exam Fees',
        class: '1',
        amount: '$255',
        startDate: '23 Apr 2020',
        endDate: '28 Apr 2020',
        action: ''
    },
    { 
        id: 'PRE2143',
        feesName: 'Exam Fees',
        class: '9',
        amount: '$545',
        startDate: '23 Apr 2020',
        endDate: '28 Apr 2020',
        action: ''
    },
    { 
        id: 'PRE2431',
        feesName: 'Sports Day Fees',
        class: '8',
        amount: '$234',
        startDate: '23 Apr 2020',
        endDate: '28 Apr 2020',
        action: ''
    },
    { 
        id: 'PRE1534',
        feesName: 'Exam Fees',
        class: '7',
        amount: '$265',
        startDate: '23 Apr 2020',
        endDate: '28 Apr 2020',
        action: ''
    },
    { 
        id: 'PRE2153',
        feesName: 'Sports Day Fees',
        class: '2',
        amount: '$334',
        startDate: '23 Apr 2020',
        endDate: '28 Apr 2020',
        action: ''
    },
    { 
        id: 'PRE1434',
        feesName: 'Sports Day Fees',
        class: '6',
        amount: '$341',
        startDate: '23 Apr 2020',
        endDate: '28 Apr 2020',
        action: ''
    },
    { 
        id: 'PRE2345',
        feesName: 'Exam Fees',
        class: '12',
        amount: '$365',
        startDate: '23 Apr 2020',
        endDate: '28 Apr 2020',
        action: ''
    },
    { 
        id: 'PRE2365',
        feesName: 'Annual Day Fees',
        class: '11',
        amount: '$83',
        startDate: '23 Apr 2020',
        endDate: '28 Apr 2020',
        action: ''
    },
    { 
        id: 'PRE1234',
        feesName: 'Class Test Fees',
        class: '5',
        amount: '$242',
        startDate: '23 Apr 2020',
        endDate: '28 Apr 2020',
        action: ''
    },
];

const columns = [
    {
        name: 'ID',
        selector:  row=>row.id,
        sortable: true,
    },
    {
        name: 'Fees Name',
        sortable: true,
        selector: row=>row.feesName
    },
    {
        name: 'Class',
        selector: row=>row.class,
        sortable: true,
    },
    {
        name: 'Amount',
        selector: row=>row.amount,
        sortable: true,
    },
    {
        name: 'Start Date',
        selector: row=>row.startDate,
        sortable: true,
    },
    {
        name: 'End Date',
        selector: row=>row.endDate,
        sortable: true,
    },
    {
        name: 'Action',
        selector:  row=>row.action,
        sortable: true,
        cell: () => <div><a href="/edit-fees" className="btn btn-sm bg-success-light me-2">
        <FontAwesomeIcon icon={faPencilAlt} /> </a> <a href="#" className="btn btn-sm bg-danger-light"> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];


class Fees extends React.Component {
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
                                <h3 className="page-title">Fees</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Fees</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-right ms-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-fees" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { Fees };