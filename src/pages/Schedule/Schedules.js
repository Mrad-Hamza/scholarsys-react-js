
import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ProgressBar } from "react-bootstrap";

import { useParams } from 'react-router-dom';
import { allSessions } from '../../slices/sessions';

import startOfISOWeek from 'date-fns/startOfISOWeek';
import endOfISOWeek from 'date-fns/endOfISOWeek';

import { allRooms } from '../../slices/room';
import { allTeachers } from '../../slices/users';
import { allSubjects } from '../../slices/subject';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';

import fr from '@fullcalendar/core/locales/fr';
import interactionPlugin from "@fullcalendar/interaction"
import { SubjectsList } from '../Subjects';
import sessionService from '../../services/session.service';
import { monthsInQuarter } from 'date-fns';

const initialevents = [
 //   { title: 'event 1', start: '2022-08-16T07:00:00', end: '2022-08-13T10:00:00', allDay: false, editable: true, start_hour: 0, start_minute: 0, seance_duration: 2, day: 1, emploiId: 1, teacherId: 18, agentId: 19, matiereId: 1 },
 //   { title: 'event 2', start: '2022-08-17T07:00:00', end: '2022-08-13T012:00:00', allDay: false, editable: true, start_hour: 0, start_minute: 0, seance_duration: 2, day: 1, emploiId: 1, teacherId: 18, agentId: 19, matiereId: 1 }
]

const initialEventRow = { title: '', start: '', end: '', allDay: false, editable: true, start_hour: 0, start_minute: 0, seance_duration: 0, day: 0, emploiId: 0, teacherId: 0, agentId: 0, matiereId: 0 }


const initialEventInformation = {
    start: "",
    teacher: "",
    room: "",
    subject: "",
    end: "",
    title: ""
}

const weekday = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];


function Schedules() {

    const dispatch = useDispatch()

    const sessions = useSelector((state) => state.sessions.sessions);
    const subjectsList = useSelector((state) => state.subjects.subjects)
    const teachersList = useSelector((state) => state.users.teachers)
    const roomsList = useSelector((state) => state.rooms.rooms)

    const [eventRow, setEventRow] = useState(initialEventRow)
    const [events, setevents] = useState(initialevents)
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [show, setShow] = useState(false);
    const [eventInformations, setEventInformations] = useState(initialEventInformation)
    const [progresBarValue, setProgresBarValue] = useState(0)

    const emploiId = useParams()


    const { user: currentUser } = useSelector((state) => state.auth);


    useEffect(() => {
        dispatch(allSessions())
        dispatch(allTeachers())
        dispatch(allSubjects())
        dispatch(allRooms())
        setProgresBarValue(0)
        setTimeout(() => {
            setIsDisplayed(true)
        }, 2000);
        filterByEmploiId(sessions)
        console.log("again")
    }, [isDisplayed])

    useEffect(() => {
      console.log(events)
    }, [events])
    

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        //filterByEmploiId(sessions)
    }, [])

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

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);


    const handleEventTeacherChange = (e) => {
        setEventInformations({
            ...eventInformations,
            teacher: e.target.value,
        })
    }

    const handleEventRoomChange = (e) => {
        setEventInformations({
            ...eventInformations,
            room: e.target.value,
        })
    }

    const handleEventSubjectChange = (e) => {
        setEventInformations({
            ...eventInformations,
            title: e.target.value.slice(1, e.target.value.length),
            subject: e.target.value[0],
        })
    }

    const handleConfirmAddEvent = (e) => {
        setevents(events => [...events, { title: eventInformations.title, start: eventInformations.start.toISOString(), end: eventInformations.end.toISOString(), editable: true }])
        sessionService.createSession(eventInformations.start.getHours(), eventInformations.start.getMinutes(), eventInformations.end.getHours() - eventInformations.start.getHours(), eventInformations.start.getDay(), parseInt(emploiId.id), parseInt(eventInformations.teacher), parseInt(currentUser.id), parseInt(eventInformations.subject), parseInt(eventInformations.room))
        handleClose()
        //setEventInformations(null)
    }

    const handleEventClick = (e) => {
        console.log(e)
    }



    const handleDateClick = (arg) => { // bind with an arrow function
        setEventInformations(arg)
        handleShow()
        //setevents(events => [...events, { title: 'test1', start: arg.start.toISOString(), end: arg.end.toISOString(), editable: true }])
    }

    const filterByEmploiId = (sessions) => {
        //sessions.filter(session => session.emploiId !== emploiId.id)
        const start = startOfISOWeek(new Date());
        sessions.map(session => {
            let month = (new Date().getMonth() + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            let minute = session.start_minute.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            let hour = session.start_hour.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            let day = start.toISOString().substring(8,10)
            switch (weekday.indexOf(session.day)) {
                case 0:
                    console.log("lundi")
                    day = parseInt(day) + 1
                    break;
                case 1:
                    console.log("mardi")
                    day = parseInt(day) +2
                    break;
                case 2:
                    console.log("mercredi")
                    day = parseInt(day) + 3
                    break;
                case 3:
                    console.log("jeudi")
                    day = parseInt(day) + 4
                    break;
                case 4:
                    console.log("vendredi")
                    day = parseInt(day) + 5
                    break;
                case 5:
                    console.log("samedi")
                    day = parseInt(day) + 6
                    break;
                case 6:
                    console.log("dimanbche")
                    day = parseInt(day) + 7
                    break;
                default:
                    break;
            }
            initialEventRow.start = new Date().getFullYear() + "-" + (month) + "-"+day
                + "T" + hour + ":" + minute + ":00"
            initialEventRow.end = new Date().getFullYear() + "-" + (month) + "-"+day
                + "T" + (hour) + ":" + minute + ":00"
            initialEventRow.editable = true
            initialEventRow.allDay = false
            initialEventRow.title = "test"
            initialEventRow.start_hour=session.start_hour
            initialEventRow.start_minute=session.start_minute
            initialEventRow.seance_duration=session.seance_duration
            initialEventRow.day = weekday.indexOf(session.day)
            initialEventRow.emploiId=session.emploiId
            initialEventRow.teacherId=session.teacherId
            initialEventRow.agentId=session.agentId
            initialEventRow.matiereId=session.matiereId
            setEventRow(initialEventRow)
        })
        setevents(events => [...events, { title: 'test1', start: eventRow.start, end: eventRow.end, editable: true }])

    }

    return (
        <>
            {isDisplayed ? <FullCalendar
                locale={fr}
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                weekends={true}
                dayHeaderFormat={{ weekday: 'long' }}
                slotMinTime={"07:00:00"}
                slotMaxTime={"20:00:00"}
                selectable={true}
                select={handleDateClick}
                events={events}
                eventClick={handleEventClick}
            /> : <ProgressBar striped variant="info" now={progresBarValue} className="mb-4" />
            }
            
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Create Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-10">
                        <select className="form-control" onChange={handleEventSubjectChange}>
                            <option>-- Choose Subject --</option>
                            {
                                subjectsList.map((subject) => {
                                    return <option value={subject.id + subject.designation}>{subject.designation} </option>
                                })
                            }
                        </select>
                    </div>
                    <br />
                    <div className="col-md-10">
                        <select className="form-control" onChange={handleEventTeacherChange}>
                            <option>-- Choose Teacher --</option>
                            {
                                teachersList.map((teacher) => {
                                    return <option value={teacher.id} > {teacher.firstname} {teacher.lastname} </option>
                                })
                            }
                        </select>
                    </div>
                    <br />
                    <div className="col-md-10">
                        <select className="form-control" onChange={handleEventRoomChange}>
                            <option>-- Choose Room --</option>
                            {
                                roomsList.map((room) => {
                                    return <option value={room.id} > {room.designation} </option>
                                })
                            }
                        </select>
                    </div>
                    <br />
                    <div className="col-md-10">
                        <input disabled type="text" className="form-control form-control-sm" value={eventInformations.start} placeholder="start date" />
                    </div>
                    <br />
                    <div className="col-md-10">
                        <input disabled type="text" className="form-control form-control-sm" value={eventInformations.end} placeholder="end date" />
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAddEvent}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}

export default Schedules