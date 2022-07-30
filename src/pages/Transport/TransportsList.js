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
        routeName: 'New Cross',
        vehicleNumber: 'TN 43 AS 5263',
        driverName: 'Steve',
        driverLicense: 'REDH968532',
        contactNumber: '+91 8974158962',
        DriverAddress: '152, South Pole, 2nd Street, 3rd Cross',
        action: ''
    },
    { 
        routeName: 'North Pole',
        vehicleNumber: 'TN 34 DB 5847',
        driverName: 'Akbar',
        driverLicense: 'RGTH958932',
        contactNumber: '+91 8596841252',
        DriverAddress: '253, 2nd Street, 3rd Cross',
        action: ''
    },
    { 
        routeName: 'South Wales',
        vehicleNumber: 'TN 34 AK 6789',
        driverName: 'Joseph',
        driverLicense: 'DLFH985632',
        contactNumber: '+91 9658741526',
        DriverAddress: '741, East Road, 2nd Street',
        action: ''
    },
];

const columns = [
    {
        name: 'Route Name',
        selector: row=>row.routeName,
        sortable: true,
    },
    {
        name: 'Vehicle Number',
        sortable: true,
        selector: row=>row.vehicleNumber,
    },
    {
        name: 'Driver Name',
        selector: row=>row.driverName,
        sortable: true,
    },
    {
        name: 'Driver License',
        selector: row=>row.driverLicense,
        sortable: true,
    },
    {
        name: 'Contact Number',
        selector: row=>row.contactNumber,
        sortable: true,
    },
    {
        name: 'Driver Address',
        selector: row=>row.DriverAddress,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: () => <div className="d-flex"><a href="/edit-transport" className="btn btn-sm bg-success-light me-2">
            <FontAwesomeIcon icon={faPencilAlt} /> </a> <a href="http://localhost:3000/" className="btn btn-sm bg-danger-light"> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];


class TransportsList extends React.Component {
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
                                <h3 className="page-title">Transports</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Transports</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-end ms-auto">
                                <a href="http://localhost:3000/" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-transport" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { TransportsList };