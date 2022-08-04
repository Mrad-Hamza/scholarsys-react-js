import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Login from './pages/Login/Login';
import Header from './_components/header/Header';
import { allUsers } from './slices/users';

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

  // Department Module
  AddDepartment,
  EditDepartment,
  DepartmentsList,

  // Subject Module
  AddSubject,
  EditSubject,
  SubjectsList,

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

  // Profile Module


  // Inbox Module
  Inbox,
  Compose
} from './pages';
import Profile from './pages/Profile/Profile';
import { Footer } from './_components';
import Fees from './pages/Fees/Fees';
import { useEffect } from 'react';
import Sidebar from './_components/sidebar/Sidebar';
import Unauthorized from './pages/UnauthorizedPage/Unauthorized';


function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
  }, [])


  if (!isLoggedIn) {
    return (
      <div>
        <RouteUnauthenticated exact path="/login" component={Login} />
        <RouteUnauthenticated exact path="/" component={Login} />
        <RouteUnauthenticated path="/register" component={Register} />
        <RouteUnauthenticated path="/forgot-password" component={ForgotPassword} />
        <RouteUnauthenticated path="/error" component={Error} />
        <Login />
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


                <PrivateAgentRoute path="/dashboard" component={Dashboard} />
                <PrivateAgentRoute path="/student-dashboard" component={StudentDashboard} />
                <PrivateAgentRoute path="/teacher-dashboard" component={TeacherDashboard} />

                {/* Student Module */}
                <PrivateAgentRoute path="/students" component={StudentsList} />
                <PrivateAgentRoute path="/add-student" component={AddStudent} />
                <PrivateAgentRoute path="/edit-student" component={EditStudent} />
                <PrivateAgentRoute path="/student-details" component={StudentDetails} />

                {/* Blank Page Module */}
                <PrivateAgentRoute path="/blank-page" component={BlankPage} />

                {/* Teacher Module */}
                <PrivateAgentRoute path="/teachers" component={TeachersList} />
                <PrivateAgentRoute path="/add-teacher" component={AddTeacher} />
                <PrivateAgentRoute path="/edit-teacher" component={EditTeacher} />
                <PrivateAgentRoute path="/teacher-details" component={TeacherDetails} />

                {/* Users Module */}
                <PrivateAgentRoute path="/add-agent" component={AddAgent} />
                <PrivateAgentRoute path="/edit-agent/:id" component={EditAgent} />
                <PrivateAgentRoute path="/agents" component={AgentsList} />

                {/* Department Module */}
                <PrivateAgentRoute path="/add-department" component={AddDepartment} />
                <PrivateAgentRoute path="/edit-department" component={EditDepartment} />
                <PrivateAgentRoute path="/departments" component={DepartmentsList} />

                {/* Subject Module */}
                <PrivateAgentRoute path="/add-subject" component={AddSubject} />
                <PrivateAgentRoute path="/edit-subject" component={EditSubject} />
                <PrivateAgentRoute path="/subjects" component={SubjectsList} />

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

                {/* Components Module */}
                <PrivateAgentRoute path="/components" component={Components} />

                {/* Forms Module */}
                <PrivateAgentRoute path="/form-basic-inputs" component={FormBasicInput} />
                <PrivateAgentRoute path="/form-horizontal" component={FormHorizontal} />
                <PrivateAgentRoute path="/form-input-groups" component={FormInputGroups} />
                <PrivateAgentRoute path="/form-mask" component={FormMask} />
                <PrivateAgentRoute path="/form-validation" component={FormValidation} />
                <PrivateAgentRoute path="/form-vertical" component={FormVertical} />

                {/* Tables Module */}
                <PrivateAgentRoute path="/tables-basic" component={TablesBasic} />
                <PrivateAgentRoute path="/data-tables" component={DataTables} />

                {/* Events Module */}
                <PrivateAgentRoute path="/event" component={Event} />
                <PrivateAgentRoute path="/add-event" component={AddEvent} />

                {/* Profile Module */}
                <RouteAuthenticated path="/profile" component={Profile} />

                {/* Inbox Module */}
                <PrivateAgentRoute path="/inbox" component={Inbox} />
                <PrivateAgentRoute path="/compose" component={Compose} />

                <RouteAuthenticated path="/unauthorized" component={Unauthorized} />


                <RouteAuthenticated exact path="/home" component={Home} />

          {/*  <RouteAuthenticated exact path="/" component={Home} />  */}


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