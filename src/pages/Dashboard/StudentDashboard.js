import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
// Import Components
import { Row, Col, Card, Table,Media } from "react-bootstrap";
// Import jQuery
import $ from 'jquery'; 
// Import Chart
import { Line, Bar } from 'react-chartjs-2';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboard, faUserGraduate, faBookOpen, faClock, faFileAlt, faClipboardList, faClipboardCheck, faHourglassEnd, faUser, faUsers, faDesktop, faLevelUpAlt, faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ProgressBar from 'react-customizable-progressbar';
import {Link} from "react-router-dom";
import { allStudents, allTeachers } from '../../slices/users';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable from 'react-data-table-component';

// Revenue Chart
const data = {
    labels: ['Jan', 'Feb', 'Mar','Apr','May','Jun', 'Jul'],
    datasets: [
        {
            label: 'Teachers',
            backgroundColor: 'rgb(25 175 251 / 20%)',
            borderColor: '#19affb',
            borderWidth: 3,
            hoverBackgroundColor: '#19affb',
            hoverBorderColor: '#19affb',
            data: [49, 22, 23,65,43,21,56,57]
        },
        {
            label: 'Students',
            backgroundColor: 'rgb(253 187 56 / 20%)',
            borderColor: '#fdbb38',
            borderWidth: 3,
            hoverBackgroundColor: '#fdbb38',
            hoverBorderColor: '#fdbb38',
            data: [43,21,56,57,70,23,43,21]
        }
    ]
};

// Student Chart
const dataBar = {
    labels: ['2010', '2011', '2012','2013','2014','2015', '2016'],
    datasets: [
        {
            label: 'Boys',
            backgroundColor: '#19affb',
            hoverBackgroundColor: '#19affb',
            hoverBorderColor: '#19affb',
            data: [497, 452, 273, 635, 483, 621, 556]
        },
        {
            label: 'Girls',
            backgroundColor: '#fdbb38',
            hoverBackgroundColor: '#fdbb38',
            hoverBorderColor: '#fdbb38',
            data: [443, 351, 526, 537, 750, 453, 643, 721]
        }
    ]
};

function componentDidMount() {
    $(document).ready(function () {
        $("#calendar-doctor").simpleCalendar({
            fixedStartDay: 0, // begin weeks by sunday
            disableEmptyDetails: true,
            events: [
                // generate new event after tomorrow for one hour
                {
                    startDate: new Date(new Date().setHours(new Date().getHours() + 24)).toDateString(),
                    endDate: new Date(new Date().setHours(new Date().getHours() + 25)).toISOString(),
                    summary: 'Conference with teachers'
                },
                // generate new event for yesterday at noon
                {
                    startDate: new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 12, 0)).toISOString(),
                    endDate: new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 11)).getTime(),
                    summary: 'Old classes'
                },
                // generate new event for the last two days
                {
                    startDate: new Date(new Date().setHours(new Date().getHours() - 48)).toISOString(),
                    endDate: new Date(new Date().setHours(new Date().getHours() - 24)).getTime(),
                    summary: 'Old Lessons'
                }
            ],
    
        });
    });
}

function format(date){
    var format = new Date(date)
    var options = {year: 'numeric', month: 'long',day: 'numeric'}
    return format.toLocaleDateString([],options)
}

function StudentDashboard(){
        const { user: currentUser } = useSelector((state) => state.auth);
        let specificData = JSON.parse(JSON.parse(currentUser.specificData))
        const dispatch = useDispatch();

        const [formation,setFormation]= useState();
        const [level,setLevel]= useState();
        const [classe,setClasse]= useState();
        const [lesClasses,setLesClasses]= useState();
        const [matieres,setMatieres] = useState();
        const [notes,setNotes] = useState();
        const [classmates,setClassmates] = useState();
        const [moyenne, setMoyenne] = useState(0);

        const teachers = useSelector((state) => state.users.teachers);
        const students = useSelector((state) => state.users.students)

        // Get data from backend

        useEffect(()=>{
            dispatch(allStudents())
            dispatch(allTeachers())

            fetch('http://localhost:8000/classes')
            .then(response => { return response.json()})
            .then(classes => {
                for(let i=0; i<classes.length;i++){
                    if(classes[i].id == specificData.classeId){
                        setClasse(classes[i]);
                    }
                }
            })

            fetch('http://localhost:8000/moyenne?studentId='+currentUser.id)
            .then(response => {return response.json()})
            .then(res =>{
                const moy = (Math.round(res.moyenne * 100) / 100).toFixed(2);
                setMoyenne(moy)
            })

            fetch('http://localhost:8000/note')
            .then(response => { return response.json()})
            .then(notes => { 
                var tableau = [];
                for(var i=0;i<notes.length;i++){
                    if(notes[i].studentId == currentUser.id){
                        tableau.push(notes[i])
                    }
                }
                setNotes(tableau)
            })
            
        },[])

        useEffect(()=>{
            if(classe !== undefined){
                fetch('http://localhost:8000/niveaus')
                .then(response => { return response.json()})
                .then(niveaux => { 
                    for(let i=0; i<niveaux.length;i++){
                        if(niveaux[i].id == classe.niveauId){
                            setLevel(niveaux[i])
                        }
                    }
                })
            }

            if(students !== undefined && currentUser !== undefined && classe !== undefined){
                var tableau = [];
                for(var i=0;i<students.length;i++){
                    let specificData = JSON.parse(JSON.parse(students[i].specificData))
                    if((specificData.classeId == classe.id) && students[i].id != currentUser.id){
                        tableau.push(students[i]);
                    }
                }
                setClassmates(tableau);
            }

        },[classe])

        useEffect(()=>{
            if(level !== undefined){
                fetch('http://localhost:8000/formations')
                .then(response => { return response.json()})
                .then(res => { 
                    for(var i=0; i<res.length; i++){
                        if(res[i].id == level.formationId){
                            setFormation(res[i])
                        }
                    }
                })

                fetch('http://localhost:8000/matiere')
                .then(response => { return response.json()})
                .then(res => { 
                    var tableau = [];
                    for(var i=0; i<res.length; i++){
                         if(res[i].niveauId == level.id){
                            tableau.push(res[i])
                        }
                    }
                setMatieres(tableau)     
                })

                fetch('http://localhost:8000/classes')
                .then(response => { return response.json()})
                .then(classes => {
                    var tableau = []
                    for(let i=0; i<classes.length;i++){
                        if((classes[i].niveauId == level.id) && (classes[i].id != specificData.classeId)){
                            tableau.push(classes[i])
                        }
                    }
                    setLesClasses(tableau);
                })

            }

        },[level])

        // Creation des tables
        
        function renderTeacher(row){
            let objet = null;
            if(teachers !== undefined){
                teachers.map(teacher =>{
                    if(teacher.id == row.teacherId){
                        objet = <Media className="user-dt"><img src={require("../../assets/user_images/" +teacher.image)} className="avatar-img rounded-circle avatar avatar-sm me-2" /><Media.Body>{teacher.firstname+' '+teacher.lastname}</Media.Body></Media>
                    }
                })
            }
            if(objet !== null){
                return objet;
            }else{
                return 'No teacher found'
            }
            
        }

        function getSubjectNameById(id){
            let name=''
            if(matieres !== undefined){
                matieres.map(matiere =>{
                    if(matiere.id == id){
                        name = matiere.designation
                    }
                })
            }
            return name;
        }

        function examState(id){
            let number = 0; 
            const today = new Date()
            if(notes !== undefined){
                notes.map(note =>{
                    if(note.matiereId == id && note.createdAt === today){
                        number ++;
                    }
                })
            }
            if(number == 0){
                return <span className="badge badge-danger">You don't new have notes</span>;
            }else{
                return <span className="badge badge-success">You have {number} new notes</span>
            }
        }

        function getMoyenne(idMatiere){
            if(notes !== undefined){
                let moy = 0;
                notes.map(note => {
                    if(note.matiereId == idMatiere){
                        moy = moy + note.note_val*note.coef_Note
                    }
                })
                moy = (Math.round(moy * 100) / 100).toFixed(2);

                if(moy > 10){
                    return <span className="badge badge-success">{moy}</span>;
                }else{
                    return <span className="badge badge-danger">{moy}</span>
                }
            }
        }
        
        function createTableMatiere(matieres){
            let data = matieres;

                const columns = [
                    {
                        name: 'Subject',
                        sortable: true,
                        selector: row=>row.designation,
                    },
                    {
                        name: 'Coefficient',
                        selector: row=>row.coef,
                        sortable: true,
                        center:true
                    },
                    {
                        name: 'Charge',
                        selector: row=>row.nbr_heure,
                        sortable: true,
                        center:true
                    },
                    {
                        name: 'Grade news',
                        sortable : true,
                        selector: row => examState(row.id),
                        center : true
                    },
                    {
                        name: 'Average',
                        sortable: true,
                        selector: row => getMoyenne(row.id),
                        center: true
                    }
                ];
            
                const tableMatiere = {
                    columns,
                    data,
                };
            
                return tableMatiere;
            }

        function createTableNotes(notes){
            const data = notes;

            const columns = [
                {
                    name: 'Subject',
                    sortable : true,
                    selector: row => getSubjectNameById(row.matiereId)
                },
                {
                    name: 'Exam Type',
                    sortable: true,
                    selector: row=>row.type,
                },
                {
                    name: 'Coefficient',
                    sortable: true,
                    selector: row=>row.coef_Note,
                    center: true
                },
                {
                    name: 'Grade',
                    sortable: true,
                    selector: row=>row.note_val+'/20',
                },
                {
                    name:'Teacher',
                    sortable: true,
                    selector: row=>renderTeacher(row),
                },
                {
                    name: 'Date de passation',
                    selector: row=>format(row.date_passage_examen),
                    sortable: true,
                },
            ];
        
            const tableNotes = {
                columns,
                data,
            };
        
            return tableNotes;
        }

        function createTableClasses(lesClasses){
            const data = lesClasses;

            const columns = [
                {
                    name: 'Classe',
                    sortable: true,
                    selector: row=>row.nom,
                },
                {
                    name: 'Number of students',
                    selector: row=>999,
                    sortable: true,
                },
            ];
        
            const tableClasses = {
                columns,
                data,
            };
        
            return tableClasses;
        }

        function createTableClasseMates(classmates){
            const data = classmates;
            console.log(data)
            const columns = [
                {
                    name: 'Student',
                    sortable: true,
                    selector: row=><Media className="user-dt"><img src={require("../../assets/user_images/" + row.image)} className="avatar-img rounded-circle avatar avatar-sm me-2" /><Media.Body>{row.firstname+' '+row.lastname}</Media.Body></Media>,
                    center:true
                },
                {
                    name: 'Email',
                    selector: row=>row.email,
                    center:true
                },
            ];
        
            const tableClassmates = {
                columns,
                data,
            };
        
            return tableClassmates;

        }
        
        // Fin de la creations

        return (
            <div>
               {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Welcome {currentUser.firstname +' '+ currentUser.lastname} !</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Student Dashboard</li>
                                </ul>
                                <br></br>
                                <div className='row'>
                                    <div className="col-xl-4 col-sm-6 col-4 d-flex">
                                        <div className="card bg-six w-100">
                                            <div className="card-body">
                                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                                    <div className="db-icon">
                                                        <FontAwesomeIcon icon={faDesktop} />
                                                    </div>
                                                    <div className="db-info">
                                                        <h3>{formation && formation.nom}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-4 d-flex">
                                        <div className="card bg-seven w-100">
                                            <div className="card-body">
                                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                                    <div className="db-icon">
                                                        <FontAwesomeIcon icon={faLevelUpAlt} />
                                                    </div>
                                                    <div className="db-info">
                                                        <h3>{level && level.designation}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-4 d-flex">
                                        <div className="card bg-eleven w-100">
                                            <div className="card-body">
                                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                                    <div className="db-icon">
                                                        <FontAwesomeIcon icon={faChalkboard} />
                                                    </div>
                                                    <div className="db-info">
                                                        <h3>{classe && classe.nom}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    {/* Overview Section */}
                <div className="row">
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-ten w-100">
                            <div className="card-body">
                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                    <div className="db-icon">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </div>
                                    <div className="db-info">
                                        <h3>{classmates && classmates.length}</h3>
                                        <h6>Classmates</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-nine w-100">
                            <div className="card-body">
                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                    <div className="db-icon">
                                        <FontAwesomeIcon icon={faBookOpen} />
                                    </div>
                                    <div className="db-info">
                                        <h3>{matieres && matieres.length}</h3>
                                        <h6>Subjects</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-six w-100">
                            <div className="card-body">
                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                    <div className="db-icon">
                                        <FontAwesomeIcon icon={faClipboardCheck} />
                                    </div>
                                    <div className="db-info">
                                        <h3>{notes && notes.length}</h3>
                                        <h6>Results</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-seven w-100">
                            <div className="card-body">
                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                    <div className="db-icon">
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </div>
                                    <div className="db-info">
                                        <h3>{moyenne}</h3>
                                        <h6>/20</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col col'>
                            <h3 className='page-title'>Subjects</h3>
                            <br></br>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-12 col-xl-12 d-flex">
                            <div className="card flex-fill">
                                {matieres && <DataTableExtensions
                                    {...createTableMatiere(matieres)} 
                                >
                                    <DataTable
                                        noHeader
                                        defaultSortField="Subject"
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                    />
                                </DataTableExtensions>}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-lg-12 col-xl-6 d-flex">
                            <div className='row'>
                                <h3 className='page-title'> Classmates </h3>
                                <div className="card flex-fill">
                                    {classmates && <DataTableExtensions
                                        {...createTableClasseMates(classmates)} 
                                        >
                                        <DataTable
                                        noHeader
                                        defaultSortField="id"
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                        />
                                        </DataTableExtensions>}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-12 col-xl-6 d-flex">
                            <div className='row'>
                                <h3 className='page-title'>Classes</h3>
                                <div className="card flex-fill">
                                    {lesClasses && <DataTableExtensions
                                        {...createTableClasses(lesClasses)} 
                                    >
                                        <DataTable
                                            noHeader
                                            defaultSortField="Subject"
                                            defaultSortAsc={false}
                                            pagination
                                            highlightOnHover
                                        />
                                    </DataTableExtensions>}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col col'>
                            <h3 className='page-title'>Grades</h3>
                            <br></br>
                        </div>
                    </div>
                    <div className='row'>
                    <div className="col-12 col-lg-12 col-xl-12 d-flex">
                            <div className="card flex-fill">
                                { notes && 
                                    <DataTableExtensions
                                    {...createTableNotes(notes)} 
                                    >
                                    <DataTable
                                        noHeader
                                        defaultSortField="id"
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                    />
                                    </DataTableExtensions>
                                }
                            </div>
                        </div>
                    </div>

                </div>
                 
                    {/* /Overview Section */}
                    {/* Student Dashboard */}
                    {/*
                    <div className="row">
                        <div className="col-12 col-lg-12 col-xl-9">
                        <div className="card flex-fill">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <h5 className="card-title">Today’s Lesson</h5>
                                    </div>
                                    <div className="col-6">
                                        <span className="float-right view-link">
                                            <a href="#">View All Courses</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="dash-circle">
                            <div className="row">
                                <div className="col-12 col-lg-6 col-xl-6 dash-widget3">
                                    <div className="card-body dash-widget1">
                                                <div className="circle-bar circle-bar2">
                                                    <ProgressBar
                                                             width={15}
                                                             radius={40}
                                                             progress={20}
                                                             rotate={-210}
                                                             strokeWidth={8}
                                                            strokeColor="#6e6bfa"
                                                            strokeLinecap="square"
                                                            trackStrokeWidth={8}
                                                            trackStrokeColor="#e6e6e6"
                                                            trackStrokeLinecap="square"
                                                            pointerRadius={0}
                                                            initialAnimation={true}
                                                            transition="1.5s ease 0.5s"
                                                            trackTransition="0s ease"
                                                        >
                                                        
                                                        <div className="indicator-volume">
                                                            <b>20%</b>
                                                        </div>
                                                        <h6>Lesson Learned</h6>
                                                        <h4>
                                                            10 <span>/ 50</span>
                                                        </h4>
                                                    </ProgressBar>
                                                    
												</div>
                                                            
                                        <div className="dash-details">
                                            <h4>Facilisi etiam</h4>
                                            <ul>
                                                <li>
                                                    <FontAwesomeIcon icon={faClock} /> 2.30pm - 3.30pm
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faBookOpen} />  5 Lessons
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faHourglassEnd} /> 60 Minutes
                                                </li>
                                                <li>
                                                   <FontAwesomeIcon icon={faClipboardCheck} /> 5 Asignment
                                                </li>
                                            </ul>
                                            <div className="dash-btn">
                                                <button type="submit" className="btn btn-info btn-border">
                                                Skip
                                                </button>
                                                <button type="submit" className="btn btn-info">
                                                Continue
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6 dash-widget4">
                                    <div className="card-body dash-widget1 dash-widget2">
                                        <div className="circle-bar circle-bar3 m-left">
                                        <ProgressBar
                                                    width={15}
                                                    radius={40}
                                                    progress={50}
                                                    rotate={-180}
                                                    strokeWidth={8}
                                                    strokeColor="#6e6bfa"
                                                    strokeLinecap="square"
                                                    trackStrokeWidth={8}
                                                    trackStrokeColor="#e6e6e6"
                                                    trackStrokeLinecap="square"
                                                    pointerRadius={0}
                                                    initialAnimation={true}
                                                    transition="1.5s ease 0.5s"
                                                    trackTransition="0s ease"
                                                >
                                                        
                                                        <div className="indicator-volume">
                                                        <b>50%</b>
                                                        <h6>Lesson Learned</h6>
                                                            <h4>
                                                                25 <span>/ 50</span>
                                                            </h4>
                                                        </div>
                                                    </ProgressBar>
                                            </div>
                                            <div className="dash-details">
                                            <h4>Augue mauris</h4>
                                            <ul>
                                                <li>
                                                    <FontAwesomeIcon icon={faClock} /> 2.30pm - 3.30pm
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faBookOpen} />  5 Lessons
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faHourglassEnd} /> 60 Minutes
                                                </li>
                                                <li>
                                                   <FontAwesomeIcon icon={faClipboardCheck} /> 5 Asignment
                                                </li>
                                            </ul>
                                            <div className="dash-btn">
                                                <button type="submit" className="btn btn-info btn-border">
                                                     Skip
                                                </button>
                                                <button type="submit" className="btn btn-info">
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-12 col-xl-8 d-flex">
                            <div className="card flex-fill">
                                <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                    <h5 className="card-title">Learning Activity</h5>
                                    </div>
                                    <div className="col-6">
                                    <ul className="list-inline-group text-end mb-0 pl-0">
                                        <li className="list-inline-item">
                                        <div className="form-group mb-0 amount-spent-select">
                                            <select className="form-control form-control-sm">
                                            <option>Weekly</option>
                                            <option>Monthly</option>
                                            <option>Yearly</option>
                                            </select>
                                        </div>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                                <div className="card-body">
                                    <Line data={data} height={250} />
                                </div>
                            </div>
                            </div>
                            <div className="col-12 col-lg-12 col-xl-4 d-flex">
                            <div className="card flex-fill">
                                <div className="card-header">
                                <h5 className="card-title">Learning History</h5>
                                </div>
                                <div className="card-body">
                                <div className="teaching-card">
                                    <ul className="activity-feed">
                                    <li className="feed-item">
                                        <div className="feed-date1">
                                        Sep 05, 9 am - 10 am (60min)
                                        </div>
                                        <span className="feed-text1">
                                        <a>Lorem ipsum dolor</a>
                                        </span>
                                        <p>
                                        <span>In Progress</span>
                                        </p>
                                    </li>
                                    <li className="feed-item">
                                        <div className="feed-date1">
                                        Sep 04, 2 pm - 3 pm (70min)
                                        </div>
                                        <span className="feed-text1">
                                        <a>Et dolore magna</a>
                                        </span>
                                        <p>Completed</p>
                                    </li>
                                    <li className="feed-item">
                                        <div className="feed-date1">
                                        Sep 02, 1 pm - 2 am (80min)
                                        </div>
                                        <span className="feed-text1">
                                        <a>Exercitation ullamco</a>
                                        </span>
                                        <p>
                                        <span>In Progress</span>
                                        </p>
                                    </li>
                                    <li className="feed-item">
                                        <div className="feed-date1">
                                        Aug 30, 10 am - 12 pm (90min)
                                        </div>
                                        <span className="feed-text1">
                                        <a>Occaecat cupidatat</a>
                                        </span>
                                        <p>Completed</p>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-lg-12 col-xl-3 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col-12">
                                <h5 className="card-title">Calendar</h5>
                                </div>
                            </div>
                            </div>
                            <div className="card-body">
                            <div id="calendar-doctor" className="calendar-container" />
                                <div className="calendar-info calendar-info1">
                                    <div className="calendar-details">
                                        <p>09 am</p>
                                        <h6 className="calendar-blue d-flex justify-content-between align-items-center">
                                            Fermentum <span>09am - 10pm</span>
                                        </h6>
                                        </div>
                                        <div className="calendar-details">
                                            <p>10 am</p>
                                            <h6 className="calendar-violet d-flex justify-content-between align-items-center">
                                                Pharetra et <span>10am - 11am</span>
                                            </h6>
                                        </div>
                                        <div className="calendar-details">
                                            <p>11 am</p>
                                            <h6 className="calendar-red d-flex justify-content-between align-items-center">
                                                Break <span>11am - 11.30am</span>
                                            </h6>
                                        </div>
                                        <div className="calendar-details">
                                            <p>12 pm</p>
                                            <h6 className="calendar-orange d-flex justify-content-between align-items-center">
                                                Massa <span>11.30am - 12.00pm</span>
                                            </h6>
                                        </div>
                                        <div className="calendar-details">
                                            <p>09 am</p>
                                            <h6 className="calendar-blue d-flex justify-content-between align-items-center">
                                                Fermentum <span>09am - 10pm</span>
                                            </h6>
                                        </div>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </div> 
                            */}
                    {/* /Student Dashboard */}
            </div>
        )
    }

export { StudentDashboard };