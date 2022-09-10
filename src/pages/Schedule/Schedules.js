
import React, { Fragment, useState, useEffect, useCallback  } from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ProgressBar } from "react-bootstrap";

import { useParams } from 'react-router-dom';
import { allSessions, sessionsByEmploiId } from '../../slices/sessions';
import { Tooltip } from "bootstrap";

import startOfISOWeek from 'date-fns/startOfISOWeek';

import { allRooms } from '../../slices/room';
import { allTeachers } from '../../slices/users';
import { allSubjects } from '../../slices/subject';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';

import fr from '@fullcalendar/core/locales/fr';
import interactionPlugin from "@fullcalendar/interaction"
import sessionService from '../../services/session.service';

import userService from '../../services/user.service';

import Select from "react-select";


const initialEventInformation = {
    start: "",
    teacher: "",
    room: "",
    subject: "",
    end: "",
    title: ""
}


const weekday = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

let scheduleEvents = []

let tooltipInstance = null;


function Schedules() {

    const dispatch = useDispatch()

    const { seances: sessions } = useSelector((state) => state.sessions.sessions);
    const subjectsList = useSelector((state) => state.subjects.subjects)
    const teachersList = useSelector((state) => state.users.teachers)
    const roomsList = useSelector((state) => state.rooms.rooms)
    //{title:"",defId:"",publicId:"",extendedProps:{agentId:"",day:"",emploiId:"",matiere:"",matiereId:"",room:"",roomId:"",teacher:"",teacherId:"",seance_duration:"",start_hour:"",start_minute:""}}
    //const [eventRow, setEventRow] = useState()
    const [events, setevents] = useState([])
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentEvent, setcurrentEvent] = useState([])
    const [deleteEventId, setDeleteEventId] = useState(false)
    const [eventInformations, setEventInformations] = useState(initialEventInformation)
    const [progresBarValue, setProgresBarValue] = useState(0)
    const emploiId = useParams()

    const calendarRef = React.useRef()

    const { user: currentUser } = useSelector((state) => state.auth);


    useEffect(() => {
        dispatch(sessionsByEmploiId(emploiId.id))
        dispatch(allTeachers())
        dispatch(allSubjects())
        dispatch(allRooms())
        setProgresBarValue(0)

        generateDataFromSessions()

        setTimeout(() => {
            setIsDisplayed(true)
        }, 2000);

        //calendarRef.current.getApi().addEventSource(events)
        //FullCalendar.getApi().render();
    }, [isDisplayed])


    useEffect(() => {
        if (!isDisplayed) {
            setTimeout(() => {
                setProgresBarValue(30)
            }, 1000);
            setTimeout(() => {
                setProgresBarValue(45)
            }, 1500);
            setTimeout(() => {
                setProgresBarValue(80)
            }, 3500);
            setTimeout(() => {
                setProgresBarValue(95)
            }, 4800);
        }
    }, [isDisplayed])


    const handleClose = () => {
        setShowAddModal(false)
        setShowDeleteModal(false)
    };

    const handleShowAddModal = () => setShowAddModal(true);

    const handleShowDeleteModal = () => setShowDeleteModal(true)


    const handleEventTeacherChange = (e) => {
        setEventInformations({
            ...eventInformations,
            teacherId: e.value,
            teacher: e.label
        })
    }

    const handleEventRoomChange = (e) => {
        setEventInformations({
            ...eventInformations,
            roomId: e.value,
            room: e.label
        })
    }

    const handleEventSubjectChange = (e) => {
        setEventInformations({
            ...eventInformations,
            title: e.label,
            subject: e.value,
            matiereId: e.value,
            matiere: e.label
        })
    }

    const handleConfirmAddEvent = async (e) => {
        console.log(eventInformations)
        let user = await userService.getUser(parseInt(eventInformations.teacherId))

        setevents(events => [...events, {
            title: eventInformations.title,
            start: eventInformations.startStr,
            end: eventInformations.endStr,
            teacherId: eventInformations.teacherId,
            subjectId: eventInformations.matiereId,
            roomId: eventInformations.roomId,
            teacher: eventInformations.teacher,
            subject: eventInformations.matiere,
            room: eventInformations.room
        }])
        let dayNumber = eventInformations.start.getDay() - 1
        let day
        if (dayNumber === -1) {
            day = "dimanche"
        } else {
            day = weekday[dayNumber]
        }
        console.log(day, dayNumber)
        sessionService.createSession(eventInformations.start.getHours(), eventInformations.start.getMinutes(), eventInformations.end.getHours() - eventInformations.start.getHours(), day, parseInt(emploiId.id), parseInt(eventInformations.teacherId), parseInt(currentUser.id), parseInt(eventInformations.matiereId), parseInt(eventInformations.roomId))

        handleClose()
        //setEventInformations(null)
    }




    const handleUpdateEventTeacherChange = (e) => {
        console.log(e)
        setcurrentEvent({
            ...currentEvent,
            teacherId: parseInt(e.value),
            teacher: e.label
        })
    }

    const handleUpdateEventRoomChange = (e) => {
        setcurrentEvent({
            ...currentEvent,
            salleId: parseInt(e.value),
            salle: e.label
        })
    }

    const handleUpdateEventSubjectChange = (e) => {
        /*  console.log(e.target.value)
         setcurrentEvent({
             ...currentEvent,
             matiereId: parseInt(e.target.value.substring(0, e.target.value.indexOf(' '))),
         }) */
        console.log(e)
        setcurrentEvent({
            ...currentEvent,
            matiereId: parseInt(e.value),
            matiere: e.label
        })
    }


    const handleEventClick = async (clickInfo) => {
        setShowDeleteModal(true)
        let eventById = await sessionService.getSessionById(clickInfo.event._def.publicId)
        setcurrentEvent(eventById)
        setDeleteEventId(clickInfo.event._def.publicId)
        //setevents((events) => events.filter((event) => event.id !== clickInfo.event._def.publicId))
        tooltipInstance.dispose();
        tooltipInstance = null;


    }

    const handleConfirmDeleteEvent = () => {
        calendarRef.current.getApi().getEventById(deleteEventId).remove()
        sessionService.deleteSession(deleteEventId)
        if (tooltipInstance) {
            tooltipInstance.dispose();
            tooltipInstance = null;
        }
        handleClose()
    }

    const handleUpdateEvent = async () => {
        console.log(currentEvent)
        //sessionService.updateSession(currentEvent.start_hour, currentEvent.start_minute, currentEvent.seance_duration, currentEvent.day, currentEvent.emploiId, currentEvent.teacherId, currentEvent.agentId, currentEvent.matiereId, currentEvent.salleId, currentEvent.id)
        sessionService.updateSession(currentEvent.start_hour, currentEvent.start_minute, currentEvent.seance_duration, weekday.indexOf(currentEvent.day) + 1, currentEvent.emploiId, currentEvent.teacherId, currentEvent.agentId, currentEvent.matiereId, currentEvent.salleId, currentEvent.id)
        if (tooltipInstance) {
            tooltipInstance.dispose();
            tooltipInstance = null;
        }
        setevents([])
        dispatch(sessionsByEmploiId(emploiId.id))
        generateDataFromSessions()
        handleClose()
        setIsDisplayed(false)
        /*  let user = await userService.getUser(currentEvent.teacherId)
         let subjectName
         let roomName
         subjectsList.map((subject) => {
             if (subject.id === currentEvent.matiereId) {
                 subjectName = subject.designation
             }
         })
         roomsList.map((room) => {
             if (room.id === currentEvent.salleId) {
                 roomName = room.designation
             }
         }) */

        /*     let eventAPI = calendarRef.current.getApi().getEventById(currentEvent.id)
            console.log(eventAPI)
            eventAPI.setExtendedProp("emploiId", currentEvent.roomId)
            eventAPI.setExtendedProp("teacherId", currentEvent.teacherId)
            eventAPI.setExtendedProp("matiere", subjectName)
            eventAPI.setExtendedProp("room", roomName)
            eventAPI.setExtendedProp("teacher", user.data.firstname + " " + user.data.lastname) */
    }


    const handleDateClick = (arg) => { // bind with an arrow function
        setEventInformations(arg)
        handleShowAddModal()
        //setevents(events => [...events, { title: 'test1', start: arg.start.toISOString(), end: arg.end.toISOString(), editable: true }])
    }

    function handleHover(mouseEnterInfo) {
        tooltipInstance = new Tooltip(mouseEnterInfo.el, {
            title: "Subject : " + mouseEnterInfo.event.title + "<br> Room : " +
                mouseEnterInfo.event.extendedProps.room + "<br> Teacher : " +
                mouseEnterInfo.event.extendedProps.teacher
            ,
            html: true,
            placement: "top",
            trigger: "focus",
            container: "body"
        });

        tooltipInstance.show();

    }

    const handleEventAdd = (addInfo) => {
        //console.log(addInfo)
        console.log("event added")
    }

    const handleEventChange = (changeInfo) => {
        if (tooltipInstance) {
            tooltipInstance.dispose();
            tooltipInstance = null;
        }
        let start = changeInfo.event._instance.range.start
        let end = changeInfo.event._instance.range.end
        let duration = end.getHours() - start.getHours()
        sessionService.updateSession(start.getHours() - 1, start.getMinutes(), duration, start.getDay(), changeInfo.event._def.extendedProps.emploiId, changeInfo.event._def.extendedProps.teacherId, changeInfo.event._def.extendedProps.agentId, changeInfo.event._def.extendedProps.matiereId, changeInfo.event._def.extendedProps.roomId, parseInt(changeInfo.event._def.publicId))

    }


    function handleMouseLeave() {
        if (tooltipInstance) {
            tooltipInstance.dispose();
            tooltipInstance = null;
        }
    }

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <br />
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    const generateDataFromSessions = useCallback( () => {
        //sessions.filter(session => session.emploiId !== emploiId.id)
        setevents([])
        const start = startOfISOWeek(new Date());
        scheduleEvents = []
        if (sessions !== undefined) {
            sessions.forEach(async (session) => {
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
                let endHour = parseInt(hour) + parseInt(session.seance_duration)
                let day = start.toISOString().substring(8, 10)
                console.log(day)
                switch (weekday.indexOf(session.day)) {
                    case 0:
                        day = parseInt(day) + 1
                        break;
                    case 1:
                        day = parseInt(day) + 2
                        break;
                    case 2:
                        day = parseInt(day) + 3
                        break;
                    case 3:
                        day = parseInt(day) + 4
                        break;
                    case 4:
                        day = parseInt(day) + 5
                        break;
                    case 5:
                        day = parseInt(day) + 6
                        break;
                    case 6:
                        day = parseInt(day) + 7
                        break;
                    default:
                        break;
                }
                let user = await userService.getUser(session.teacherId)
                let subjectName
                let roomName
                subjectsList.map((subject) => {
                    if (subject.id === session.matiereId) {
                        subjectName = subject.designation
                    }
                })
                roomsList.map((room) => {
                    if (room.id === session.salleId) {
                        roomName = room.designation
                    }
                })
                let data = {}
                if ( parseInt(day)>= 10) {
                    data.start = new Date().getFullYear() + "-" + (month) + "-" + day
                        + "T" + hour + ":" + minute + ":00+01:00"
                    data.end = new Date().getFullYear() + "-" + (month) + "-" + day
                        + "T" + endHour + ":" + minute + ":00+01:00"
                } else {
                    data.start = new Date().getFullYear() + "-" + (month) + "-0" + day
                        + "T" + hour + ":" + minute + ":00+01:00"
                    data.end = new Date().getFullYear() + "-" + (month) + "-0" + day
                        + "T" + endHour + ":" + minute + ":00+01:00"
                }
                data.editable = true
                data.allDay = false
                data.title = subjectName
                data.id = session.id
                data.start_hour = session.start_hour
                data.start_minute = session.start_minute
                data.seance_duration = session.seance_duration
                data.day = weekday.indexOf(session.day)
                data.roomId = session.salleId
                data.room = roomName
                data.emploiId = session.emploiId
                data.teacherId = session.teacherId
                data.teacher = user.data.firstname + " " + user.data.lastname
                data.agentId = session.agentId
                data.subjectId = session.matiereId
                data.subject = subjectName
                scheduleEvents.push(data)
            })
            console.log(scheduleEvents)
            setTimeout(() => {
                scheduleEvents.map(event => {
                    setevents(events => [...events, event])
                });
            }, 500);
        }
    }, [sessions, roomsList, subjectsList])
    
    useEffect(() => {
        console.log(events)
    }, [events])


    const subjectsSelectList = subjectsList.map((subject) => {
        return { value: subject.id, label: subject.designation }
    });

    const teachersSelectList = teachersList.map((teacher) => {
        return { value: teacher.id, label: teacher.firstname + " " + teacher.lastname }
    });

    const roomsSelectList = roomsList.map((room) => {
        return { value: room.id, label: room.designation }
    })

    return (
        <>

            {isDisplayed ? <FullCalendar
                id={"calendar"}
                ref={calendarRef}
                locale={fr}
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                weekends={true}
                //droppable={true}
                dayHeaderFormat={{ weekday: 'long' }}
                slotMinTime={"07:00:00"}
                slotMaxTime={"20:00:00"}
                selectable={true}
                eventClick={handleEventClick}

                select={handleDateClick}
                eventAdd={handleEventAdd}
                eventChange={handleEventChange}
                eventContent={renderEventContent}
                eventMouseEnter={handleHover}
                eventMouseLeave={handleMouseLeave}
                //eventDidMount={handleHover}
                events={events}
            /> : <ProgressBar striped variant="info" now={progresBarValue} className="mb-4" />
            }

            <Modal show={showAddModal} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Create Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-10">
                        {/*  <select className="form-control" onChange={handleEventSubjectChange}>
                            <option>-- Choose Subject --</option>
                            {
                                subjectsList.map((subject) => {
                                    return <option value={subject.id + " " + subject.designation}>{subject.designation} </option>
                                })
                            }
                        </select> */}
                        <Select
                            placeholder="Select a subject ..."
                            options={subjectsSelectList}
                            onChange={handleEventSubjectChange}
                            isSearchable={true}
                        />
                    </div>
                    <br />
                    <div className="col-md-10">
                        {/*   <select className="form-control" onChange={handleEventTeacherChange}>
                            <option>-- Choose Teacher --</option>
                            {
                                teachersList.map((teacher) => {
                                    return <option value={teacher.id} > {teacher.firstname} {teacher.lastname} </option>
                                })
                            }
                        </select> */}
                        <Select
                            placeholder="Select a teacher ..."
                            options={teachersSelectList}
                            onChange={handleEventTeacherChange}
                            isSearchable={true}
                        />

                    </div>
                    <br />
                    <div className="col-md-10">
                        {/*   <select className="form-control" onChange={handleEventRoomChange}>
                            <option>-- Choose Room --</option>
                            {
                                roomsList.map((room) => {
                                    return <option value={room.id} > {room.designation} </option>
                                })
                            }
                        </select> */}
                        <Select
                            placeholder="Select a room ..."
                            options={roomsSelectList}
                            onChange={handleEventRoomChange}
                            isSearchable={true}
                        />
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


            <Modal show={showDeleteModal} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Update Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-10">

                        <Select
                            placeholder="Select a subject ..."
                            options={subjectsSelectList}
                            onChange={handleUpdateEventSubjectChange}
                            isSearchable={true}
                        />

                    </div>
                    <br />
                    <div className="col-md-10">
                        <Select
                            placeholder="Select a teacher ..."
                            options={teachersSelectList}
                            onChange={handleUpdateEventTeacherChange}
                            isSearchable={true}
                        />
                    </div>
                    <br />
                    <div className="col-md-10">

                        <Select
                            placeholder="Select a room ..."
                            options={roomsSelectList}
                            onChange={handleUpdateEventRoomChange}
                            isSearchable={true}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleConfirmDeleteEvent}>
                        Delete Session
                    </Button>
                    <Button variant="primary" onClick={handleUpdateEvent}>
                        Save Changes
                    </Button>

                </Modal.Footer>
            </Modal>


        </>

    )

}

export default Schedules
