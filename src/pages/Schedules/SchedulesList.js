import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { allSchedules } from '../../slices/schedules';
import { allAgents } from '../../slices/users';
import { allClasses } from '../../slices/classes';
import scheduleService from '../../services/schedule.service';
import { useHistory } from 'react-router-dom'
import userService from '../../services/user.service';

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


let data = [
];


function SchedulesList() {
    const dispatch = useDispatch()
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [progresBarValue, setProgresBarValue] = useState(0)

    const history = useHistory()


    const schedulesList = useSelector((state) => state.schedules.schedules)
    const agentsList = useSelector((state) => state.users.agents)
    const classesList = useSelector((state) => state.classes.classes)


    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Classe',
            selector: row => row.classeId,
            sortable: true,
        },
        {
            name: 'Agent',
            selector: row => row.agentId,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.id,
            sortable: true,
            cell: (row) => <div><button className="btn btn-sm bg-success-light me-2" onClick={() => history.push('/schedule/' + row.id)}>
                <FontAwesomeIcon icon={faPencilAlt} /> </button> <button className="btn btn-sm bg-danger-light" onClick={() => deleteUser(row)}> <FontAwesomeIcon icon={faTrash} /> </button></div>
        }
    ];

    useEffect(() =>  {
        dispatch(allSchedules())
        dispatch(allClasses())
        dispatch(allAgents())

        data = schedulesList

    
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
        //userService.deleteUser(row.id)
        setIsDisplayed(false)
    }

    const addUser = () => {
        //history.push('/add-agent')
    }

    const getUser = async (id) => {
        let agent = await userService.getUser(id)
        return agent.data
    }


    function DatatableView() {
        return (
            <DataTableExtensions
                {...tableData}
            >
                <DataTable
                    noHeader
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
                            <h3 className="page-title">Schedules</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active">Schedules</li>
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

export default SchedulesList
