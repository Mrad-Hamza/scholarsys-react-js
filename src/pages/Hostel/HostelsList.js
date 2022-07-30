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
        block: 'A Block',
        roomNo: '101',
        roomType: 'Medium',
        noBeds: '6',
        costBed: '$10',
        availability: '',
        action: ''
    },
    { 
        block: 'A Block',
        roomNo: '101',
        roomType: 'Medium',
        noBeds: '6',
        costBed: '$10',
        availability: '',
        action: ''
    },
    { 
        block: 'A Block',
        roomNo: '102',
        roomType: 'Medium',
        noBeds: '6',
        costBed: '$10',
        availability: '',
        action: ''
    },
    { 
        block: 'B Block',
        roomNo: '104',
        roomType: 'Big',
        noBeds: '8',
        costBed: '$10',
        availability: '',
        action: ''
    },
    { 
        block: 'A Block',
        roomNo: '107',
        roomType: 'Medium',
        noBeds: '6',
        costBed: '$10',
        availability: '',
        action: ''
    },
    { 
        block: 'A Block',
        roomNo: '108',
        roomType: 'Medium',
        noBeds: '6',
        costBed: '$10',
        availability: '',
        action: ''
    },
    { 
        block: 'B Block',
        roomNo: '102',
        roomType: 'Medium',
        noBeds: '6',
        costBed: '$10',
        availability: '',
        action: ''
    },
    { 
        block: 'B Block',
        roomNo: '107',
        roomType: 'Small',
        noBeds: '6',
        costBed: '$10',
        availability: '',
        action: ''
    },
];

const columns = [
    {
        name: 'Block',
        selector: row=>row.block,
        sortable: true,
    },
    {
        name: 'Room No',
        sortable: true,
        selector: row=>row.roomNo,
    },
    {
        name: 'Room Type',
        selector: row=>row.roomType,
        sortable: true,
    },
    {
        name: 'No of Beds',
        selector: row=>row.noBeds,
        sortable: true,
    },
    {
        name: 'Cost per Bed',
        selector: row=>row.costBed,
        sortable: true,
    },
    {
        name: 'Availability',
        selector: row=>row.availability,
        sortable: true,
        cell: () => <span className="badge badge-danger">Full</span>
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: () => <div className="d-flex"><a href="/edit-room" className="btn btn-sm bg-success-light me-2">
        <FontAwesomeIcon icon={faPencilAlt} /> </a> <a href="#" className="btn btn-sm bg-danger-light"> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];


class HostelList extends React.Component {
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
                                <h3 className="page-title">Hostel</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Hostel</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-right float-rightms-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-room" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { HostelList };