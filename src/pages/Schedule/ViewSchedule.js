
import React, { useState, useEffect } from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import { ProgressBar } from "react-bootstrap";

import { useParams } from 'react-router-dom';
import { allSessions } from '../../slices/sessions';
import { Tooltip } from "bootstrap";

import startOfISOWeek from 'date-fns/startOfISOWeek';

import { allRooms } from '../../slices/room';
import { allTeachers } from '../../slices/users';
import { allSubjects } from '../../slices/subject';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';

import fr from '@fullcalendar/core/locales/fr';

import userService from '../../services/user.service';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload} from '@fortawesome/fontawesome-free-solid';




const weekday = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

let scheduleEvents = []

let tooltipInstance = null;

function ViewSchedule() {
    const dispatch = useDispatch()

    const sessions = useSelector((state) => state.sessions.sessions);
    const subjectsList = useSelector((state) => state.subjects.subjects)
    const roomsList = useSelector((state) => state.rooms.rooms)
    //{title:"",defId:"",publicId:"",extendedProps:{agentId:"",day:"",emploiId:"",matiere:"",matiereId:"",room:"",roomId:"",teacher:"",teacherId:"",seance_duration:"",start_hour:"",start_minute:""}}
    //const [eventRow, setEventRow] = useState()
    const [events, setevents] = useState([])
    const [isDisplayed, setIsDisplayed] = useState(false);
  
    const [progresBarValue, setProgresBarValue] = useState(0)
    const emploiId = useParams()

    const calendarRef = React.useRef()


    useEffect(() => {
        setevents([])
        dispatch(allSessions())
        dispatch(allTeachers())
        dispatch(allSubjects())
        dispatch(allRooms())
        setProgresBarValue(0)

        generateDataFromSessions()

        setTimeout(() => {
            setIsDisplayed(true)
        }, 1000);
        //calendarRef.current.getApi().addEventSource(events)
        //FullCalendar.getApi().render();
    }, [isDisplayed])

    useEffect(() => {
        if (!isDisplayed) {
            setTimeout(() => {
                setProgresBarValue(30)
            }, 200);
            setTimeout(() => {
                setProgresBarValue(45)
            }, 500);
            setTimeout(() => {
                setProgresBarValue(80)
            }, 800);
            setTimeout(() => {
                setProgresBarValue(95)
            }, 950);
        }
    }, [isDisplayed])


    const generateDataFromSessions = () => {
        //sessions.filter(session => session.emploiId !== emploiId.id)
        const start = startOfISOWeek(new Date());
        scheduleEvents = []
        setevents([])
        sessions.forEach(async (session) => {
            if (session.emploiId === parseInt(emploiId.id)) {
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
                data.start = new Date().getFullYear() + "-" + (month) + "-" + day
                    + "T" + hour + ":" + minute + ":00"
                data.end = new Date().getFullYear() + "-" + (month) + "-" + day
                    + "T" + endHour + ":" + minute + ":00"
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
                data.matiereId = session.matiereId
                data.matiere = subjectName
                scheduleEvents.push(data)
            }
        })
        setTimeout(() => {
            scheduleEvents.map(event => {
                setevents(events => [...events, event])
            });

        }, 500);
    }

    function handleMouseLeave() {
        if (tooltipInstance) {
            tooltipInstance.dispose();
            tooltipInstance = null;
        }
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

    return (
        <>
            <button href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</button>
            {isDisplayed ? <FullCalendar
                id={"calendar"}
                ref={calendarRef}
                locale={fr}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                weekends={true}
                //droppable={true}
                dayHeaderFormat={{ weekday: 'long' }}
                slotMinTime={"07:00:00"}
                slotMaxTime={"20:00:00"}

                eventMouseEnter={handleHover}
                eventMouseLeave={handleMouseLeave}
                //eventDidMount={handleHover}
                events={events}
            /> : <ProgressBar striped variant="info" now={progresBarValue} className="mb-4" />
            }
        </>
    )
}

export default ViewSchedule