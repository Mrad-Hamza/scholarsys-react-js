import React, { useEffect, useState,useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { allSchedules } from '../../slices/schedules';
import { allAgents } from '../../slices/users';
import { allClasses } from '../../slices/classes';
import { allSessions } from '../../slices/sessions';
import scheduleService from '../../services/schedule.service';
import { useHistory } from 'react-router-dom'
import userService from '../../services/user.service';
import toast, { Toaster } from 'react-hot-toast';


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
import classeService from '../../services/classe.service';
import sessionService from '../../services/session.service';



function SchedulesList() {
    const dispatch = useDispatch()
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [progresBarValue, setProgresBarValue] = useState(0)
    const [data, setdata] = useState([])

    const history = useHistory()


    const schedulesList = useSelector((state) => state.schedules.schedules)
    const agentsList = useSelector((state) => state.users.agents)
    const classesList = useSelector((state) => state.classes.classes)
    const sessions = useSelector((state) => state.sessions.sessions);



    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Classe',
            selector: row => row.classeName,
            sortable: true,
        },
        {
            name: 'Agent',
            selector: row => row.agentname,
            sortable: true,
        },
        {
            name: 'Download',
            selector: row => row,
            cell: (row) => <div>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleGenerateScheduleClick(row)}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        },
        {
            name: 'Action',
            selector: row => row.id,
            sortable: true,
            cell: (row) => <div>
                <button className="btn btn-sm bg-success-light me-2" onClick={() => history.push('/schedule/' + row.id)}><FontAwesomeIcon icon={faPencilAlt} /> </button>
                <button className="btn btn-sm bg-danger-light" onClick={() => deleteSchedule(row)}> <FontAwesomeIcon icon={faTrash} /> </button>
            </div>
        }
    ];

    useEffect(() => {
        setdata([])
        dispatch(allSchedules())
        dispatch(allClasses())
        dispatch(allAgents())
        dispatch(allSessions())
        setProgresBarValue(0)
        generateData()
        setTimeout(() => {
            setIsDisplayed(true)
        }, 2000);
    }, [isDisplayed])

    useEffect(() => {

    }, [schedulesList])

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        if (!isDisplayed) {
            setTimeout(() => {
                setProgresBarValue(30)
            }, 100);
            setTimeout(() => {
                setProgresBarValue(45)
            }, 350);
            setTimeout(() => {
                setProgresBarValue(80)
            }, 600);
            setTimeout(() => {
                setProgresBarValue(95)
            }, 900);
        }
    }, [isDisplayed])

    const tableData = {
        columns,
        data,
    };

    const generateData = useCallback(() => {
        setdata([])
        schedulesList.forEach(async (element) => {
            let agent = await userService.getUser(element.agentId)
            let classeName
            console.log(element)
            classesList.map(classe => {
                if (classe.id === element.classeId) {
                    classeName = classe.designation
                }
            })
            let name = agent.data.firstname + " " + agent.data.lastname
            setdata((data) => [...data, { id: element.id, name: element.name, agentname: name, agentId: element.agentId, classeName: classeName, classeId: element.classeId }])
        });
    }, [schedulesList]);

    const handleGenerateScheduleClick = (row) => {
        console.log(row)
        window.open("http://localhost:8000/static/emploi/students/" + row.name + ".pdf")
    }

    const deleteSchedule = (row) => {
        console.log("ti delete ")
        scheduleService.deleteSchedule(row.id)
        sessions.map((currentsession) => {
            if (currentsession.emploiId === row.id) {
                sessionService.deleteSession(currentsession.id)
            }
        })
        dispatch(allSchedules())
        setIsDisplayed(false)
    }

    const addSchedule = () => {
        history.push('/add-schedule')
        setIsDisplayed(false)
    }

    const getUser = async (id) => {
        let agent = await userService.getUser(id)
        return agent.data
    }

    const handlePDF = async () => {
        await scheduleService.generatePDF()
        toast.success("Schedules are genereated successfully. They are available to download.")

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
            <Toaster position="top-right"
                reverseOrder={false} />
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
                            <button className="btn btn-primary" onClick={handlePDF}><FontAwesomeIcon icon={faPencilAlt} /></button> &nbsp; &nbsp;
                            <button className="btn btn-primary" onClick={addSchedule}><FontAwesomeIcon icon={faPlus} /></button>
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
