import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { allTeachers, allUsers } from '../../slices/users';
import userService from '../../services/user.service';
import { useHistory } from 'react-router-dom'
// Import Components
import { Row, Col, Card, Media, ProgressBar } from "react-bootstrap";
//Import Data Table
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPencilAlt, faPlus, faTrash } from '@fortawesome/fontawesome-free-solid';
import { useSelector } from 'react-redux';

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

let data = [
];

function TeachersList() {
    const dispatch = useDispatch()
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [progresBarValue, setProgresBarValue] = useState(0)
    const history = useHistory()



    const usersList = useSelector((state) => state.users.teachers)

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'Birth Date',
            selector: row => row.birthDate,
            sortable: true,
        },
        {
            name: 'First Name',
            selector: row => row.firstname,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lastname,
            sortable: true,
        },
        {
            name: 'Classe',
            selector: row => row.classe,
            sortable: false,
        },
        {
            name: 'Niveau',
            selector: row => row.niveau,
            sortable: false,
        },
        {
            name: 'Matiere',
            selector: row => row.matiere,
            sortable: false,
        },
        {
            name: 'Salaire',
            selector: row => row.salaire,
            sortable: false,
        },
        {
            name: 'Action',
            selector: row => row.id,
            sortable: true,
            cell: (row) => <div><button className="btn btn-sm bg-success-light me-2" onClick={() => history.push('/edit-teacher/' + row.id)}>
                <FontAwesomeIcon icon={faPencilAlt} /> </button> <button className="btn btn-sm bg-danger-light" onClick={() => deleteUser(row)}> <FontAwesomeIcon icon={faTrash} /> </button></div>
        }
    ];

    useEffect(() => {
        dispatch(allTeachers())
        data = usersList
        setProgresBarValue(0)
        setTimeout(() => {
            setIsDisplayed(true)
        }, 2000);
    }, [isDisplayed])

    useEffect(() => {
        if (!isDisplayed) {
            setTimeout(() => {
                setProgresBarValue(30)
            }, 300);
            setTimeout(() => {
                setProgresBarValue(45)
            }, 800);
            setTimeout(() => {
                setProgresBarValue(80)
            }, 1400);
            setTimeout(() => {
                setProgresBarValue(95)
            }, 1800);
        }
    }, [isDisplayed])

    const tableData = {
        columns,
        data,
    };

    const deleteUser = (row) => {
        userService.deleteUser(row.id)
        setIsDisplayed(false)
    }

    const addUser = () => {
        history.push('/add-teacher')
    }


    function DatatableView() {
        return (
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
        )
    }


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
                            <button className="btn btn-primary" onClick={addUser}><FontAwesomeIcon icon={faPlus} /></button>
                        </Col>
                    </Row>
                </div>
            </div>

            <Card>
                {isDisplayed ? <DatatableView /> : <ProgressBar striped variant="info" now={progresBarValue} className="mb-4" />
                }
            </Card>

        </div>
    )
}

export default TeachersList