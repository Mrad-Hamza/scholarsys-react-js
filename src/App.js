import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Login from './pages/Login/Login';
import Header from './_components/header/Header';
import { allUsers } from './slices/users';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import PrivateAgentRoute from './_components/_helpers/PrivateAgentRoute';
import PrivateStudentRoute from './_components/_helpers/PrivateStudentRoute';
import PrivateTeacherRoute from './_components/_helpers/PrivateTeacherRoute';
import RouteAuthenticated from './_components/_helpers/RouteAuthenticated';
import RouteUnauthenticated from './_components/_helpers/RouteUnauthenticated';

import Home from './pages/Home/Home';

import AddAgent from './pages/Agents/AddAgent';
import EditAgent from './pages/Agents/EditAgent';
import AgentsList from './pages/Agents/AgentsList';

import AddTeacher from './pages/Teachers/AddTeacher';
import EditTeacher from './pages/Teachers/EditTeacher';
import TeachersList from './pages/Teachers/TeachersList';

import AddStudent from './pages/Students/AddStudent';
import EditStudent from './pages/Students/EditStudent';
import StudentsList from './pages/Students/StudentsList';


import {
  // Authentication Modules
  Error,

  // Dashboard Module
  Dashboard,
  StudentDashboard,
  TeacherDashboard,

  // Students Module

  StudentDetails,

  // Teachers Module
  TeacherDetails,

  // Formation Module
  AddFormation,
  EditFormation,
  FormationsList,

  // Levels Module
  AddLevel,
  EditLevel,
  LevelsList,

  // Levels Module
  AddClass,
  EditClass,
  ClassesList,

  // Subject Module
  AddSubject,
  EditSubject,
  SubjectsList,

  // Grade Module
  AddGrade,
  EditGrade,
  GradesList,

  //Charge Module
  AddCharge,
  EditCharge,
  ChargesList,

  // Accounts Module
  FeesCollections,
  Expenses,
  Salary,
  AddFeesCollections,
  AddExpenses,
  AddSalary,

  // Holiday Module
  Holiday,
  AddHoliday,

  // Fees Module
  AddFees,
  EditFees,

  // Exam Module
  Exam,
  AddExam,
  EditExam,

  // Time Table Module
  TimeTable,
  AddTimeTable,
  EditTimeTable,

  // Library Module
  Library,
  AddBook,
  EditBook,

  //Blank Page Module
  BlankPage,

  // Sports Module
  SportsList,
  AddSport,
  EditSport,

  // Hostel Module
  HostelList,
  AddRoom,
  EditRoom,

  // Transport Module
  TransportsList,
  AddTransport,
  EditTransport,

  // Components Module
  Components,

  // Forms Module
  FormBasicInput,
  FormHorizontal,
  FormInputGroups,
  FormMask,
  FormValidation,
  FormVertical,

  // Tables Module
  TablesBasic,
  DataTables,

  // Events Module
  Event,
  AddEvent,

  // Inbox Module
  Inbox,
  Compose
} from './pages';
import { Footer } from './_components';
import Fees from './pages/Fees/Fees';
import { useEffect } from 'react';
import Sidebar from './_components/sidebar/Sidebar';
import Unauthorized from './pages/UnauthorizedPage/Unauthorized';
import Profile from './pages/Profile/Profile';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ConfirmAccount from './pages/ConfirmAccount/ConfirmAccount';
import { logout } from './slices/auth';
import Schedules from './pages/Schedule/Schedules';
import SchedulesList from './pages/Schedules/SchedulesList';
import AddSchedule from './pages/Schedules/AddSchedule';
import ViewSchedule from './pages/Schedule/ViewSchedule';
import ViewScheduleForTeacher from './pages/Schedule/ViewScheduleForTeacher';
import Attendance from './pages/Attendance/Attendance';

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const location = useLocation();
  const history = useHistory()
  const dispatch = useDispatch()

  const token = localStorage.getItem('token')

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };


  useEffect(() => {
    const currentPath = location.pathname;
    if (isLoggedIn) {
      if (currentPath === "/") {
        history.push('/home')
      }
    } else {
      if (currentPath === "/") {
        history.push('/login')
      }
    }
     if (token) {
       const decodedJwt = parseJwt(token);
       if (decodedJwt.exp * 1000 < Date.now()) {
         dispatch(logout())
         history.push('/login')
       }
     }

  }, [location])



  if (!isLoggedIn) {
    return (
      <div>
        <RouteUnauthenticated path="/login" component={Login} />
        <RouteUnauthenticated path="/register" component={Register} />
        <RouteUnauthenticated path="/forgot-password" component={ForgotPassword} />
        <RouteUnauthenticated path="/error" component={Error} />
        <RouteUnauthenticated path="/reset_password/:refreshToken" component={ResetPassword} />
        <RouteUnauthenticated path="/confirm/:refreshToken" component={ConfirmAccount} />
      </div>
    )
  } else {
    return (
      <div className="App">

        <div className="main-wrapper">
          {/* <Sidebar/> */}
          <Route render={(props) => <Sidebar {...props} />} />
          <div>
            <Route render={(props) => <Header {...props} />} />

            <div className="page-wrapper">
              <div className="content container-fluid">

                <PrivateAgentRoute path="/schedule/:id" component={Schedules} />
                <PrivateAgentRoute path="/schedules-list" component={SchedulesList} />
                <PrivateAgentRoute path="/add-schedule" component={AddSchedule} />
                <RouteAuthenticated path="/view-schedule/:id" component={ViewSchedule} />
                <RouteAuthenticated path="/view-schedule-teacher/:id" component={ViewScheduleForTeacher} />

                {/* Profile Module */}
                <RouteAuthenticated path="/profile" component={Profile} />

                {/* Accounts Module */}
                <RouteAuthenticated path="/fees-collections" component={FeesCollections} />
                <RouteAuthenticated path="/expenses" component={Expenses} />
                <RouteAuthenticated path="/salary" component={Salary} />
                <RouteAuthenticated path="/add-fees-collections" component={AddFeesCollections} />
                <RouteAuthenticated path="/add-expenses" component={AddExpenses} />
                <RouteAuthenticated path="/add-salary" component={AddSalary} />

                {/* Users Module */}

                {/* Holiday Module */}
                <RouteAuthenticated path="/holiday" component={Holiday} />
                <RouteAuthenticated path="/add-holiday" component={AddHoliday} />

                {/* Fees Module */}
                <RouteAuthenticated path="/fees" component={Fees} />
                <RouteAuthenticated path="/add-fees" component={AddFees} />
                <RouteAuthenticated path="/edit-fees" component={EditFees} />

                {/* Exam Module */}
                <RouteAuthenticated path="/exam" component={Exam} />
                <RouteAuthenticated path="/add-exam" component={AddExam} />
                <RouteAuthenticated path="/edit-exam" component={EditExam} />

                {/* Time Table Module */}
                <RouteAuthenticated path="/time-table" component={TimeTable} />
                <RouteAuthenticated path="/add-time-table" component={AddTimeTable} />
                <RouteAuthenticated path="/edit-time-table" component={EditTimeTable} />

                {/* Library Module */}
                <RouteAuthenticated path="/library" component={Library} />
                <RouteAuthenticated path="/add-book" component={AddBook} />
                <RouteAuthenticated path="/edit-book" component={EditBook} />


                {/* Sports Module */}
                <RouteAuthenticated path="/sports" component={SportsList} />
                <RouteAuthenticated path="/add-sport" component={AddSport} />
                <RouteAuthenticated path="/edit-sport" component={EditSport} />

                {/* Hostel Module */}
                <RouteAuthenticated path="/hostel" component={HostelList} />
                <RouteAuthenticated path="/add-room" component={AddRoom} />
                <RouteAuthenticated path="/edit-room" component={EditRoom} />

                {/* Transport Module */}
                <RouteAuthenticated path="/transport" component={TransportsList} />
                <RouteAuthenticated path="/add-transport" component={AddTransport} />
                <RouteAuthenticated path="/edit-transport" component={EditTransport} />



                {/* Inbox Module */}
                <RouteAuthenticated path="/inbox" component={Inbox} />
                <RouteAuthenticated path="/compose" component={Compose} />

                <RouteAuthenticated path="/unauthorized" component={Unauthorized} />

                <RouteAuthenticated exact path="/home" component={Home} />



                {/* Blank Page Module */}
                <RouteAuthenticated path="/blank-page" component={BlankPage} />

                <div>

                  <Route path="/attendance/:id" component={Attendance} />

                  {/* Teacher Module */}
                  <PrivateAgentRoute exact path="/teachers" component={TeachersList} />
                  <PrivateAgentRoute exact path="/add-teacher" component={AddTeacher} />
                  <PrivateAgentRoute exact path="/edit-teacher/:id" component={EditTeacher} />
                  <PrivateAgentRoute exact path="/teacher-details" component={TeacherDetails} />

                  {/* Users Module */}
                  <PrivateAgentRoute exact path="/add-agent" component={AddAgent} />
                  <PrivateAgentRoute exact path="/edit-agent/:id" component={EditAgent} />
                  <PrivateAgentRoute exact path="/agents" component={AgentsList} />

                  {/* Department Module */}


                  {/* Subject Module */}
                  <PrivateAgentRoute exact path="/add-subject" component={AddSubject} />
                  <PrivateAgentRoute exact path="/edit-subject" component={EditSubject} />
                  <PrivateAgentRoute exact path="/subjects" component={SubjectsList} />

                  {/* Formation Module */}
                  <Route path="/add-formation" component={AddFormation} />
                  <Route path="/edit-formation" component={EditFormation} />
                  <Route path="/formations" component={FormationsList} />

                  {/* Levels Module */}
                  <Route path="/add-level" component={AddLevel} />
                  <Route path="/edit-level" component={EditLevel} />
                  <Route path="/levels" component={LevelsList} />

                  {/* Levels Module */}
                  <Route path="/add-class" component={AddClass} />
                  <Route path="/edit-class" component={EditClass} />
                  <Route path="/classes" component={ClassesList} />

                  {/* Grade Module */}
                  <Route path="/add-grade" component={AddGrade} />
                  <Route path="/edit-grade" component={EditGrade} />
                  <Route path="/grades" component={GradesList} />

                  {/* Charge Module */}
                  <Route path="/add-charge" component={AddCharge} />
                  <Route path="/edit-charge" component={EditCharge} />
                  <Route path="/charges" component={ChargesList} />

                  {/* Accounts Module */}
                  <Route path="/fees-collections" component={FeesCollections} />
                  <Route path="/expenses" component={Expenses} />
                  <Route path="/salary" component={Salary} />
                  <Route path="/add-fees-collections" component={AddFeesCollections} />
                  <Route path="/add-expenses" component={AddExpenses} />
                  <Route path="/add-salary" component={AddSalary} />

                  {/* Holiday Module */}
                  <Route path="/holiday" component={Holiday} />
                  <Route path="/add-holiday" component={AddHoliday} />

                  {/* Fees Module */}
                  <Route path="/fees" component={Fees} />
                  <Route path="/add-fees" component={AddFees} />
                  <Route path="/edit-fees" component={EditFees} />

                  {/* Exam Module */}
                  <Route path="/exam" component={Exam} />
                  <Route path="/add-exam" component={AddExam} />
                  <Route path="/edit-exam" component={EditExam} />

                  {/* Time Table Module */}
                  <Route path="/time-table" component={TimeTable} />
                  <Route path="/add-time-table" component={AddTimeTable} />
                  <Route path="/edit-time-table" component={EditTimeTable} />

                  {/* Library Module */}
                  <Route path="/library" component={Library} />
                  <Route path="/add-book" component={AddBook} />
                  <Route path="/edit-book" component={EditBook} />


                  {/* Sports Module */}
                  <Route path="/sports" component={SportsList} />
                  <Route path="/add-sport" component={AddSport} />
                  <Route path="/edit-sport" component={EditSport} />

                  {/* Hostel Module */}
                  <Route path="/hostel" component={HostelList} />
                  <Route path="/add-room" component={AddRoom} />
                  <Route path="/edit-room" component={EditRoom} />

                  {/* Transport Module */}
                  <Route path="/transport" component={TransportsList} />
                  <Route path="/add-transport" component={AddTransport} />
                  <Route path="/edit-transport" component={EditTransport} />

                  {/* Components Module */}
                  <PrivateAgentRoute exact path="/components" component={Components} />

                  {/* Forms Module */}
                  <PrivateAgentRoute exact path="/form-basic-inputs" component={FormBasicInput} />
                  <PrivateAgentRoute exact path="/form-horizontal" component={FormHorizontal} />
                  <PrivateAgentRoute exact path="/form-input-groups" component={FormInputGroups} />
                  <PrivateAgentRoute exact path="/form-mask" component={FormMask} />
                  <PrivateAgentRoute exact path="/form-validation" component={FormValidation} />
                  <PrivateAgentRoute exact path="/form-vertical" component={FormVertical} />

                  {/* Tables Module */}
                  <PrivateAgentRoute exact path="/tables-basic" component={TablesBasic} />
                  <PrivateAgentRoute exact path="/data-tables" component={DataTables} />

                  {/* Events Module */}
                  <PrivateAgentRoute exact path="/event" component={Event} />
                  <PrivateAgentRoute exact path="/add-event" component={AddEvent} />

                  <PrivateAgentRoute exact path="/dashboard" component={Dashboard} />
                  <RouteAuthenticated exact path="/student-dashboard" component={StudentDashboard} />
                  <PrivateTeacherRoute exact path="/teacher-dashboard" component={TeacherDashboard} />

                  {/* Student Module */}
                  <PrivateAgentRoute exact path="/students" component={StudentsList} />
                  <PrivateAgentRoute exact path="/add-student" component={AddStudent} />
                  <PrivateAgentRoute exact path="/edit-student/:id" component={EditStudent} />
                  <PrivateAgentRoute exact path="/student-details" component={StudentDetails} />
                </div>

              </div>
              <Route render={(props) => <Footer {...props} />} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;