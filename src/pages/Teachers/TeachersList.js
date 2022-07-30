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
import Img1 from '../../assets/img/profiles/avatar-01.jpg';
import Img2 from '../../assets/img/profiles/avatar-02.jpg';
import Img3 from '../../assets/img/profiles/avatar-03.jpg';
import Img4 from '../../assets/img/profiles/avatar-04.jpg';
import Img5 from '../../assets/img/profiles/avatar-05.jpg';
import Img6 from '../../assets/img/profiles/avatar-06.jpg';
import Img7 from '../../assets/img/profiles/avatar-07.jpg';
import Img8 from '../../assets/img/profiles/avatar-08.jpg';
import Img9 from '../../assets/img/profiles/avatar-09.jpg';
import Img10 from '../../assets/img/profiles/avatar-10.jpg';

const data = [
    { 
        id: 'PRE2209',
        name: 'Aaliyah',
        class: '10',
        gender: 'Female',
        subject: 'Mathematics',
        section: 'A',
        mobileNumber: '097 3584 5870',
        address: '911 Deer Ridge Drive,USA',
        action: '',
        img_url:Img1,
    },
    { 
        id: 'PRE2213',
        name: 'Malynne',
        class: '8',
        gender: 'Female',
        subject: 'Physics',
        section: 'A',
        mobileNumber: '242 362 3100',
        address: 'Bacardi Rd P.O. Box N-4880, New Providence',
        action: '',
        img_url:Img3,
    },
    { 
        id: 'PRE2143',
        name: 'Levell Scott',
        class: '10',
        gender: 'Male',
        subject: 'Science',
        section: 'B',
        mobileNumber: '026 7318 4366',
        address: 'P.O. Box: 41, Gaborone',
        action: '',
        img_url:Img2,
    },
    { 
        id: 'PRE2431',
        name: 'Minnie',
        class: '11',
        gender: 'Male',
        subject: 'History',
        section: 'C',
        mobileNumber: '952 512 4909',
        address: '4771  Oral Lake Road, Golden Valley',
        action: '',
        img_url:Img3,
    },
    { 
        id: 'PRE1534',
        name: 'Lois A',
        class: '10',
        gender: 'Female',
        subject: 'English',
        section: 'B',
        mobileNumber: '413 289 1314',
        address: '2844 Leverton Cove Road, Palmer',
        action: '',
        img_url:Img4,
    },
    { 
        id: 'PRE2153',
        name: 'Calvin',
        class: '9',
        gender: 'Male',
        subject: 'Mathematics',
        section: 'C',
        mobileNumber: '701 753 3810',
        address: '1900  Hidden Meadow Drive, Crete',
        action: '',
        img_url:Img5,
    },
    { 
        id: 'PRE1434',
        name: 'Vincent',
        class: '10',
        gender: 'Male',
        subject: 'Mathematics',
        section: 'C',
        mobileNumber: '402 221 7523',
        address: '3979  Ashwood Drive, Omaha',
        action: '',
        img_url:Img7,
    },
    { 
        id: 'PRE2345',
        name: 'Kozma  Tatari',
        class: '9',
        gender: 'Female',
        subject: 'Science',
        section: 'A',
        mobileNumber: '04 2239 968',
        address: 'Rruga E Kavajes, Condor Center, Tirana',
        action: '',
        img_url:Img8,
    },
    { 
        id: 'PRE2365',
        name: 'John Chambers',
        class: '11',
        gender: 'Male',
        subject: 'Botony',
        section: 'B',
        mobileNumber: '870 663 2334',
        address: '4667 Sunset Drive, Pine Bluff',
        action: '',
        img_url:Img9,
    },
    { 
        id: 'PRE1234',
        name: 'Nathan Humphries',
        class: '10',
        gender: 'Male',
        subject: 'Biology',
        section: 'A',
        mobileNumber: '077 3499 9959',
        address: '86 Lamphey Road, Thelnetham',
        action: '',
        img_url:Img10,
    }
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
        cell: row => <Media className="user-dt"><a href="/teacher-details"><img src={row.img_url}className="avatar-img rounded-circle avatar avatar-sm me-2" /></a><Media.Body><a href="/student-details">{row.name}</a></Media.Body></Media>
    },
    {
        name: 'Class',
        selector: row=>row.class,
        sortable: true,
    },
    {
        name: 'Gender',
        selector: row=>row.gender,
        sortable: true,
    },
    {
        name: 'Subject',
        selector: row=>row.subject,
        sortable: true,
    },
    {
        name: 'Section',
        selector: row=>row.section,
        sortable: true
    },
    {
        name: 'Mobile Number',
        selector: row=>row.mobileNumber,
        sortable: true,
    },
    {
        name: 'Address',
        selector: row=>row.address,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: () => <div><a href="/edit-teacher" className="btn btn-sm bg-success-light me-2">
        <FontAwesomeIcon icon={faPencilAlt} /> </a> <a href="#" className="btn btn-sm bg-danger-light"> <FontAwesomeIcon icon={faTrash} /> </a></div>
    },
];


class TeachersList extends React.Component {
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
                                <h3 className="page-title">Teachers</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Teachers</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-right ms-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-teacher" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { TeachersList };