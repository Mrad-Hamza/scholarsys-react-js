import React from 'react';
// Import Components
import { Row, Col, Card, Media } from "react-bootstrap";
//Import Data Table
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPlus } from '@fortawesome/fontawesome-free-solid';

import Img1 from '../../assets/img/profiles/avatar-01.jpg';

const data = [
    { 
        id: 'PRE2209',
        name: 'Aaliyah',
        gender: 'Female',
        feesType: 'Mess Fees',
        amount: '$120',
        paidDate: '17 Aug 2020',
        status: ''
    },
    { 
        id: 'PRE2213',
        name: 'Malynne',
        gender: 'Female',
        feesType: 'Class Test',
        amount: '$56',
        paidDate: '05 Aug 2020',
        status: ''
    },
    { 
        id: 'PRE2143',
        name: 'Levell Scott',
        gender: 'Male',
        feesType: 'Exam Fees',
        amount: '$378',
        paidDate: '04 Sept 2020',
        status: ''
    },
    { 
        id: 'PRE2431',
        name: 'Minnie',
        gender: 'Female',
        feesType: 'Exam Fees',
        amount: '$246',
        paidDate: '17 Sept 2020',
        status: ''
    },
    { 
        id: 'PRE1534',
        name: 'Lois A',
        gender: 'Male',
        feesType: 'Exam Fees',
        amount: '$56',
        paidDate: '02 Oct 2020',
        status: ''
    },
    { 
        id: 'PRE2153',
        name: 'Calvin',
        gender: 'Male',
        feesType: 'Exam Fees',
        amount: '$236',
        paidDate: '28 Oct 2020',
        status: ''
    },
    { 
        id: 'PRE1252',
        name: 'Joe Kelley',
        gender: 'Female',
        feesType: 'Transport Fees',
        amount: '$237',
        paidDate: '17 Oct 2020',
        status: ''
    },
    { 
        id: 'PRE1434',
        name: 'Vincent',
        gender: 'Male',
        feesType: 'Mess Fees',
        amount: '$567',
        paidDate: '05 Nov 2020',
        status: ''
    },
    { 
        id: 'PRE2345',
        name: 'Kozma  Tatari',
        gender: 'Female',
        feesType: 'Exam Fees',
        amount: '$564',
        paidDate: '12 Nov 2020',
        status: ''
    },
    { 
        id: 'PRE2365',
        name: 'John Chambers',
        gender: 'Male',
        feesType: 'Class Test',
        amount: '$234',
        paidDate: '15 Nov 2020',
        status: ''
    },

    { 
        id: 'PRE1234',
        name: 'Nathan Humphries',
        gender: 'Male',
        feesType: 'Exam Fees',
        amount: '$278',
        paidDate: '17 Nov 2020',
        status: ''
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
        cell: row => <Media className="user-dt"><a href="/student-details"><img src={Img1} className="avatar-img rounded-circle avatar avatar-sm me-2" /></a><Media.Body><a href="/student-details">{row.name}</a></Media.Body></Media>
    },
    {
        name: 'Gender',
        selector: row=>row.gender,
        sortable: true,
    },
    {
        name: 'Fees Type',
        selector: row=>row.feesType,
        sortable: true,
    },
    {
        name: 'Amount',
        selector: row=>row.amount,
        sortable: true,
    },
    {
        name: 'Paid Date',
        selector: row=>row.paidDate,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row=>row.status,
        sortable: true,
        cell: () => <div className="text-right"><span className="badge badge-success">Paid</span></div>
    },
];

class FeesCollections extends React.Component {
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
                                <h3 className="page-title">Fees Collections</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Fees Collections</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-right float-right ml-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-fees-collections" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { FeesCollections };