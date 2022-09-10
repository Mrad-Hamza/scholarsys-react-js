import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { allSchedules } from '../../slices/schedules';
import { allAgents, allStudentsByClasseId } from '../../slices/users';
import { allClasses } from '../../slices/classes';
import { allSessions } from '../../slices/sessions';
import { allAttendances } from '../../slices/attendance';
import scheduleService from '../../services/schedule.service';
import { useHistory } from 'react-router-dom'
import userService from '../../services/user.service';
import { useParams } from 'react-router-dom';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

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
import attendanceService from '../../services/attendance.service';
import subjectService from '../../services/subject.service';



function Attendance() {

  const dispatch = useDispatch()
  const { attendance: attendance } = useSelector((state) => state.attendances.attendances)
  const students = useSelector((state) => state.users.students)
  const { id: sessionId } = useParams()
  const [schedule, setschedule] = useState({})
  const [session, setsession] = useState({})
  const [classe, setclasse] = useState({})
  const [subject, setsubject] = useState({})

  const value = useRef()

  useEffect(() => {
    dispatch(allAttendances(sessionId))
    async function fetchSessionData() {
      setsession(await sessionService.getSessionById(sessionId))
    }
    fetchSessionData()
    setTimeout(() => {
      dispatch(allAttendances(sessionId))
    }, 500);
  }, [])

  useEffect(() => {
    if (attendance !== undefined) {
      if (attendance.length === 0) {
        console.log("aaaaa")
        students.map((student) => {
          attendanceService.createAttendance("FALSE", session.id, student.id)
        })

      }
    }

  }, [attendance, students])



  useEffect(() => {
    async function fetchScheduleData() {
      setschedule(await scheduleService.getOne(session.emploiId))
    }
    fetchScheduleData()
  }, [session])

  useEffect(() => {
    if (schedule !== {} && schedule !== null && schedule !== undefined) {
      dispatch(allStudentsByClasseId(schedule.classeId))
    }
  }, [schedule])

  useEffect(() => {
    async function fetchClassData() {
      setclasse(await classeService.getById(schedule.classeId))
    }
    async function fetchSubjectData() {
      let data = await subjectService.getOne(session.matiereId)
      setsubject(data[0])
    }
    if (schedule !== {} && schedule !== null && schedule !== undefined) {
      fetchClassData()
      fetchSubjectData()
    }
  }, [schedule])

  

  const handleAttendanceChange = async (attendance, e) => {
    console.log(attendance, e)
    attendanceService.updateAttendance(attendance.id, sessionId, attendance.studentId, e.toString())
  }

  /*   const handleCheckedValue = async (student)=> {
      let { attendance: attendance } = await attendanceService.getOneBySeanceIdAndStudentId(sessionId, student.id)
      return attendance[0].state 
    } */

  return (
    <div>
      <div className="page-header">
        <Row>
          <Col sm={12}>
            <h3 className="page-title">{classe && <div>{classe.nom} - {subject && subject.designation} </div>}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
              <li className="breadcrumb-item active">Attendance List</li>
            </ul>
          </Col>
        </Row>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-md-6 ">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Attendance</h5>
            </div>
            <div className="card-body">
              <form action="#">
                <div className="form-group">
                  {/*  <label className="d-block">Gender:</label>
                     <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="gender" id="gender_male" value="option1" />
                      <label className="form-check-label" htmlFor="gender_male">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="gender" id="gender_female" value="option2" />
                      <label className="form-check-label" htmlFor="gender_female">Female</label>
                    </div>  */}
                  {attendance && attendance.map((attendance) => {
                    let student = {}
                    students.map((s) => {
                      if (s.id === attendance.studentId) {
                        student = s
                      }
                    })
                    return (
                      <>
                        {student.firstname} {student.lastname} : &nbsp; &nbsp;
                        <BootstrapSwitchButton
                          onstyle="success"
                          checked={attendance.state}
                          width={100}
                          onlabel='Present'
                          offlabel='Absent'
                          onChange={(e) => handleAttendanceChange(attendance, e)} />
                        <br />
                        <br />
                      </>
                    )
                  })

                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Attendance