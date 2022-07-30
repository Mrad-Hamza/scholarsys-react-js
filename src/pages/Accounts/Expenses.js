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


const data = [
    { 
        id: 'PRE2209',
        itemName: 'Chair',
        itemQuality: '6',
        amount: '$120',
        purchaseSource: 'Abc Shop',
        purchaseDate: '17 Aug 2020',
        purchaseBy: 'Lois'
    },
    { 
        id: 'PRE2213',
        itemName: 'Table',
        itemQuality: '2',
        amount: '$56',
        purchaseSource: 'Online',
        purchaseDate: '05 Aug 2020',
        purchaseBy: 'Malynne'
    },
    { 
        id: 'PRE2143',
        itemName: 'Desk',
        itemQuality: '6',
        amount: '$378',
        purchaseSource: 'Take Away',
        purchaseDate: '04 Sept 2020',
        purchaseBy: 'Levell Scott'
    },
    { 
        id: 'PRE2431',
        itemName: 'Projector',
        itemQuality: '1',
        amount: '$246',
        purchaseSource: 'Real Shop',
        purchaseDate: '17 Sept 2020',
        purchaseBy: 'Minnie'
    },
    { 
        id: 'PRE1534',
        itemName: 'Hard disk',
        itemQuality: '2',
        amount: '$560',
        purchaseSource: 'Sony Center',
        purchaseDate: '02 Oct 2020',
        purchaseBy: 'Lois A'
    },
    { 
        id: 'PRE2153',
        itemName: 'Note books',
        itemQuality: '100',
        amount: '$236',
        purchaseSource: 'DJ Stationary',
        purchaseDate: '28 Oct 2020',
        purchaseBy: 'Calvin'
    },
    { 
        id: 'PRE1252',
        itemName: 'Water Bottle',
        itemQuality: '267',
        amount: '$237',
        purchaseSource: 'DJ Stationary',
        purchaseDate: '17 Oct 2020',
        purchaseBy: 'Joe Kelley'
    },
    { 
        id: 'PRE1536',
        itemName: 'Hard disk',
        itemQuality: '3',
        amount: '$560',
        purchaseSource: 'Music Center',
        purchaseDate: '02 Oct 2020',
        purchaseBy: 'Lois A'
    },
];

const columns = [
    {
        name: 'ID',
        selector: row=>row.id,
        sortable: true,
    },
    {
        name: 'Item Name',
        sortable: true,
        selector: row=>row.itemName
    },
    {
        name: 'Item Quality',
        selector: row=>row.itemQuality,
        sortable: true,
    },
    {
        name: 'Amount',
        selector: row=>row.amount,
        sortable: true,
    },
    {
        name: 'Purchase Source',
        selector: row=>row.purchaseSource,
        sortable: true,
    },
    {
        name: 'Purchase Date',
        selector: row=>row.purchaseDate,
        sortable: true,
    },
    {
        name: 'Purchase By',
        selector: row=>row.purchaseBy,
        sortable: true,
    },
];


class Expenses extends React.Component {
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
                                <h3 className="page-title">Expenses</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Expenses</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-right float-right ml-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-expenses" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { Expenses };