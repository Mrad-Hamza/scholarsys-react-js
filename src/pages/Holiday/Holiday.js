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
        holidayName: 'Sports Day',
        type: 'College Holiday',
        startDate: '17 Aug 2020',
        endDate: '19 Aug 2020'
    },
    { 
        id: 'PRE2213',
        holidayName: 'Memorial Day',
        type: 'Public Holiday',
        startDate: '05 Aug 2020',
        endDate: '06 Aug 2020'
    },
    { 
        id: 'PRE2143',
        holidayName: 'Annual Day',
        type: 'College Holiday',
        startDate: '04 Sept 2020',
        endDate: '07 Sept 2020'
    },
    { 
        id: 'PRE2431',
        holidayName: 'Exam Holiday',
        type: 'Semester leave',
        startDate: '17 Sept 2020',
        endDate: '30 Sept 2020'
    },
    { 
        id: 'PRE2208',
        holidayName: 'Sports Day',
        type: 'College Holiday',
        startDate: '17 Aug 2020',
        endDate: '19 Aug 2020'
    },
    { 
        id: 'PRE2214',
        holidayName: 'Memorial Day',
        type: 'Public Holiday',
        startDate: '05 Aug 2020',
        endDate: '06 Aug 2020'
    },
    { 
        id: 'PRE2144',
        holidayName: 'Annual Day',
        type: 'College Holiday',
        startDate: '04 Sept 2020',
        endDate: '07 Sept 2020'
    },
    { 
        id: 'PRE2432',
        holidayName: 'Exam Holiday',
        type: 'Semester leave',
        startDate: '17 Sept 2020',
        endDate: '30 Sept 2020'
    },
];

const columns = [
    {
        name: 'ID',
        selector: row=>row.id,
        sortable: true,
    },
    {
        name: 'Holiday Name',
        sortable: true,
        selector: row=>row.holidayName
    },
    {
        name: 'Type',
        selector: row=>row.type,
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
];


class Holiday extends React.Component {
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
                                <h3 className="page-title">Holiday</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Holiday</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-right float-right ms-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-holiday" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { Holiday };