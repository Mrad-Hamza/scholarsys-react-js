import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import { history } from "../../src/_components/_helpers";
import { AdminLayoutRoute, LoginLayoutRoute } from "./routerLayout";


import {
    // Authentication Modules
    Login, 
    Register,
    ForgotPassword,
    Error,

    // Dashboard Module
    Dashboard,
    StudentDashboard,
    TeacherDashboard,

    // Students Module
    StudentsList,
    AddStudent,
    EditStudent,
    StudentDetails,

    // Teachers Module
    TeachersList,
    AddTeacher,
    EditTeacher,
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
    Fees,
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
    Profile,

    // Inbox Module
    Inbox,
    Compose
} from '../pages';
import { Sidebar, Header, Footer } from '../_components';

import config from 'config';
// CSS Files

class RouterComponent extends React.Component {
    render() {
        return (
            <Router basename={`${config.publicPath}`} >
                <Switch>
                
                    {/* Login Layout */}
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/error" component={Error} />                   
                    
                </Switch>

                <div className="main-wrapper">
                    {/* <Sidebar/> */}
                    <Route render={(props) => <Sidebar {...props} />} />
                    <div>
                        <Route render={(props) => <Header {...props} />} />

                        <div className="page-wrapper">
                            <div className="content container-fluid">
                                <Switch>
                                    <Route path="/dashboard" component={Dashboard} />
                                    <Route path="/student-dashboard" component={StudentDashboard} />
                                    <Route path="/teacher-dashboard" component={TeacherDashboard} />

                                    {/* Student Module */}
                                    <Route path="/students" component={StudentsList} />
                                    <Route path="/add-student" component={AddStudent} />
                                    <Route path="/edit-student" component={EditStudent} />
                                    <Route path="/student-details" component={StudentDetails} />

                                    {/* Blank Page Module */}
                                    <Route path="/blank-page" component={BlankPage} />

                                    {/* Teacher Module */}
                                    <Route path="/teachers" component={TeachersList} />
                                    <Route path="/add-teacher" component={AddTeacher} />
                                    <Route path="/edit-teacher" component={EditTeacher} />
                                    <Route path="/teacher-details" component={TeacherDetails} />

                                    {/* Department Module */}
                                    <Route path="/add-department" component={AddDepartment} />
                                    <Route path="/edit-department" component={EditDepartment} />
                                    <Route path="/departments" component={DepartmentsList} />

                                    {/* Subject Module */}
                                    <Route path="/add-subject" component={AddSubject} />
                                    <Route path="/edit-subject" component={EditSubject} />
                                    <Route path="/subjects" component={SubjectsList} />

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
                                    <Route path="/components" component={Components} />

                                    {/* Forms Module */}
                                    <Route path="/form-basic-inputs" component={FormBasicInput} />
                                    <Route path="/form-horizontal" component={FormHorizontal} />
                                    <Route path="/form-input-groups" component={FormInputGroups} />
                                    <Route path="/form-mask" component={FormMask} />
                                    <Route path="/form-validation" component={FormValidation} />
                                    <Route path="/form-vertical" component={FormVertical} />

                                    {/* Tables Module */}
                                    <Route path="/tables-basic" component={TablesBasic} />
                                    <Route path="/data-tables" component={DataTables} />

                                    {/* Events Module */}
                                    <Route path="/event" component={Event} />
                                    <Route path="/add-event" component={AddEvent} />

                                    {/* Profile Module */}
                                    <Route path="/profile" component={Profile} />

                                    {/* Inbox Module */}
                                    <Route path="/inbox" component={Inbox} />
                                    <Route path="/compose" component={Compose} />
                                </Switch>
                            </div>
                            <Route render={(props) => <Footer {...props} />} />
                        </div>
                    </div>
                </div>
            
            </Router>         
        )
    }
}
export { RouterComponent };