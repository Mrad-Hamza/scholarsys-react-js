import React, {useState, useEffect} from 'react';
// Import Components
import { Row, Col, Card, Table, Media } from "react-bootstrap";
// Import jQuery
import $ from 'jquery';
// Import Chart
import { Line, Bar } from 'react-chartjs-2';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faClock, faFileAlt, faClipboardList, faClipboardCheck, faChalkboard, faUserGraduate, faDesktop, faLevelDownAlt, faLevelUpAlt, faChalkboardTeacher } from '@fortawesome/fontawesome-free-solid';
import ProgressBar from 'react-customizable-progressbar';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux/es/exports';
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

function TeacherDashboard() {
    const { user: currentUser } = useSelector((state) => state.auth);
    let specificData = JSON.parse(JSON.parse(currentUser.specificData))
    const dispatch = useDispatch();

    const [lesFormation, setLesFormations] = useState();
    const [lesNiveaux, setLesNiveaux] = useState();
    const [lesClasses,setLesClasses] = useState();
    const [lesMatieres, setLesMatieres] = useState();
    const [lesNotes, setLesNotes] = useState();
    const [lesEtudiants, setLesEtudiants] = useState();

    const teachers = useSelector((state) => state.users.teachers);
    const students = useSelector((state) => state.users.students)

    useEffect(()=>{
        dispatch(allStudents())
        dispatch(allTeachers())

        if(specificData !== undefined) {
            fetch('http://localhost:8000/classes')
            .then(response => { return response.json()})
            .then(classes => {
                let tableau = []
                for(let i=0; i<classes.length;i++){
                    if(specificData.classesId.includes(classes[i].id)){
                        tableau.push(classes[i])
                    }
                }
                setLesClasses(tableau)
            })
        }

        fetch('http://localhost:8000/note')
        .then(response => { return response.json()})
        .then(notes => { 
            var tableau = [];
            for(var i=0;i<notes.length;i++){
                if(notes[i].teacherId == currentUser.id){
                    tableau.push(notes[i])
                }
            }
            setLesNotes(tableau)
        })
        
    },[])

    useEffect(()=>{
        console.log(lesClasses,lesNotes)
        if(lesClasses !== undefined){
            fetch('http://localhost:8000/niveaus')
            .then(response => { return response.json()})
            .then(niveaux => { 
                let tableau = []
        
                for (let i=0; i<lesClasses.length;i++){
                    let j=0;
                    let condition = false
                    
                    do{
                        if(niveaux[j].id == lesClasses[i].niveauId && !tableau.includes(niveaux[j])){
                            tableau.push(niveaux[j])
                            condition = true
                        }else{
                            j++
                        }
                    }while(j<niveaux.length && condition === false)
                }
                setLesNiveaux(tableau);
            })
            if(students !== undefined){
                let tableau = []
                for(let i=0; i<lesClasses.length;i++){
                    for(let j=0;j<students.length;j++){
                        let classeId = JSON.parse(JSON.parse(students[j].specificData)).classeId
                        if(classeId == lesClasses[i].id){
                            tableau.push(students[j])
                        }
                    }
                }
                setLesEtudiants(tableau)
            }
            

        }

    },[lesClasses])

    useEffect(()=>{
        console.log(lesNiveaux)
        if(lesNiveaux !== undefined){
            fetch('http://localhost:8000/formations')
            .then(response => { return response.json()})
            .then(formations => { 
                let tableau = []
                for(let i=0; i<lesNiveaux.length; i++){
                    let j=0;
                    let condition = false;
                    do{
                        if(formations[j].id == lesNiveaux[i].formationId && !tableau.includes(formations[j])){
                            tableau.push(formations[j]);
                            condition =true
                        }else{
                            j++
                        }
                    }while(j<formations.length && condition === false)
                }
                setLesFormations(tableau)
            })

            fetch('http://localhost:8000/matiere')
                .then(response => { return response.json()})
                .then(matieres => { 
                    let tableau = []
                    for(let i=0;i<matieres.length;i++){
                        let j=0;
                        let condition = false;
                        do{
                            if(matieres[i].niveauId == lesNiveaux[j].id){
                                tableau.push(matieres[i])
                                condition = true
                            }else{
                                j++
                            }
                        }while(j<lesNiveaux.length && condition == false)
                    }
                    setLesMatieres(tableau)
                })
        }
        
    },[lesNiveaux])

        function createTableFormations(formations){
            let data = formations.sort((a,b)=>{
                return a.id - b.id
            });

            const columns = [
                {
                    name: 'Formation Name',
                    sortable: true,
                    selector: row=>row.nom,
                },
            ];

            const tableFormations = {
                columns,
                data,
            };
        
            return tableFormations;
        }

        function createLevelTable(levels){
            let data = levels.sort((a,b)=>{
                return a.id - b.id
            });

            const columns = [
                {
                    name: 'Designation',
                    sortable: true,
                    selector: row=>row.designation,
                },
                {
                    name:'Acronyme',
                    sortable: true,
                    selector: row=> row.acronyme
                },
                {
                    name:'Formation',
                    sortable: true,
                    selector: row => row.formationId
                }
            ];

            const tableLevels = {
                columns,
                data,
            };
        
            return tableLevels;

        }

        function createTableClasses(classes){
            let data = classes.sort((a,b)=>{
                return a.id - b.id
            });

            const columns = [
                {
                    name: 'Name',
                    sortable: true,
                    selector: row=>row.nom,
                },
                {
                    name:'Designation',
                    sortable: true,
                    selector: row=> row.designation
                },
                {
                    name:'Level',
                    sortable: true,
                    selector: row => row.niveauId
                }
            ];

            const tableClasses = {
                columns,
                data,
            };
        
            return tableClasses;
        }

        function createTableEtudiants(lesEtudiants){
            let data = lesEtudiants.sort((a,b)=>{
                return a.specificData - b.specificData
            });

            const columns = [
                {
                    name: 'Name',
                    sortable: true,
                    selector: row=><Media className="user-dt"><img src={require("../../assets/user_images/" + row.image)} className="avatar-img rounded-circle avatar avatar-sm me-2" /><Media.Body>{row.firstname+' '+row.lastname}</Media.Body></Media>,
                    width: "180px"
                },
                {
                    name:'Email',
                    sortable: true,
                    selector: row=> row.email
                },
                {
                    name:'Phone Number',
                    sortable: true,
                    selector: row => row.phoneNumber,
                    center:true
                }
            ];

            const tableEtudiants = {
                columns,
                data,
            };
        
            return tableEtudiants;
        }

        function getSubjectById(id){
            let name = ''
            if(lesMatieres !== undefined){
                lesMatieres.map(subject =>{
                    if(subject.id == id){
                        name = subject.designation
                    }
                } )
            }
            return name;
        }

        function getStudentNameById(id){
            let name = ''
            if(lesEtudiants !== undefined){
                lesEtudiants.map(etudiant =>{
                    if(etudiant.id == id){
                        name = etudiant.firstname+' '+etudiant.lastname
                    }
                } )
            }
            return name;
        }

        function renderStudent(row){
            let objet = null;
            if(lesEtudiants !== undefined){
                lesEtudiants.map(etudiant =>{
                    if(etudiant.id == row.studentId){
                        objet = <Media className="user-dt"><img src={require("../../assets/user_images/" +etudiant.image)} className="avatar-img rounded-circle avatar avatar-sm me-2" /><Media.Body>{etudiant.firstname+' '+etudiant.lastname}</Media.Body></Media>
                    }
                })
            }
            if(objet !== null){
                return objet;
            }
            else{
                return 'No student found'
            }
            
        }

        function createTableNotes(notes){
            if(notes !== undefined && lesEtudiants !== undefined){
                let data = notes.sort((a,b)=>{
                    return a.date_passage_examen - b.date_passage_examen
                });

                console.log(data)
    
                const columns = [
                    {
                        name:'Type',
                        sortable: true,
                        selector: row => row.type,
                    },
                    {
                        name:'Notes',
                        sortable: true,
                        selector: row => row.note_val+'/20',
                    },
                    {
                        name:'Coefficient',
                        sortable: true,
                        selector: row => row.coef_Note,
                    },
                    {
                        name: 'Subject',
                        sortable: true,
                        selector: row => getSubjectById(row.matiereId)
                    },
                    {
                        name: 'Student',
                        sortable: true,
                        selector: row=> renderStudent(row),
                        center: true
                    },
                    {
                        name: 'Exam Date',
                        sortable: true,
                        selector: row => format(row.date_passage_examen),
                    }
    
                ];
    
                const tableNotes = {
                    columns,
                    data,
                };
            
                return tableNotes;
            }
        }

        return (
            <div>
               {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Welcome {currentUser.firstname +' '+currentUser.lastname}!</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Teacher Dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    {/* Overview Section */}
                    <div className="row">
                        <div className="col-xl-3 col-sm-6 col-12 d-flex">
                            <div className="card bg-nine w-100">
                                <div className="card-body">
                                    <div className="db-widgets d-flex justify-content-between align-items-center">
                                        <div className="db-icon">
                                            <FontAwesomeIcon icon={faDesktop} />
                                        </div>
                                        <div className="db-info">
                                            <h3>{lesFormation && lesFormation.length}</h3>
                                            <h6>Formations</h6>
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
                                         <FontAwesomeIcon icon={faLevelUpAlt} />
                                        </div>
                                        <div className="db-info">
                                            <h3>{lesNiveaux && lesNiveaux.length}</h3>
                                            <h6>Levels</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 d-flex">
                            <div className="card bg-ten w-100">
                                <div className="card-body">
                                    <div className="db-widgets d-flex justify-content-between align-items-center">
                                        <div className="db-icon">
                                            <FontAwesomeIcon icon={faChalkboardTeacher} />
                                        </div>
                                        <div className="db-info">
                                            <h3>{lesClasses && lesClasses.length}</h3>
                                            <h6>Classes</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 d-flex">
                            <div className="card bg-eleven w-100">
                                <div className="card-body">
                                    <div className="db-widgets d-flex justify-content-between align-items-center">
                                        <div className="db-icon">
                                            <FontAwesomeIcon icon={faFileAlt} />
                                        </div>
                                        <div className="db-info">
                                            <h3>{lesMatieres && lesMatieres.length}</h3>
                                            <h6>Subjects</h6>
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
                                            <FontAwesomeIcon icon={faUserGraduate} />
                                        </div>
                                        <div className="db-info">
                                            <h3>{lesEtudiants && lesEtudiants.length}</h3>
                                            <h6>Students</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Overview Section */}
                    {/* Student Dashboard */}   
                    <div className="row">
                    <div className="row">
                        <div className="col-12 col-lg-12 col-xl-6 d-flex">
                            <div className='row'>
                                <h3 className='page-title'>Formations</h3>
                                <div className="card flex-fill">
                                    {lesFormation && <DataTableExtensions
                                        {...createTableFormations(lesFormation)} 
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
                                <h3 className='page-title'>Levels</h3>
                                <div className="card flex-fill">
                                    {lesNiveaux && <DataTableExtensions
                                        {...createLevelTable(lesNiveaux)} 
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
                    </div>

                    <div className='row'>
                        <div className="col-12 col-lg-12 col-xl-6 d-flex">
                            <div className='row'>
                                <h3 className='page-title'>Classes</h3>
                                <div className="card flex-fill">
                                    {lesClasses && <DataTableExtensions
                                        {...createTableClasses(lesClasses)} 
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
                            <div>
                                <h3 className='page-title'>Students</h3>
                                <div className="card flex-fill">
                                    {lesEtudiants && <DataTableExtensions
                                        {...createTableEtudiants(lesEtudiants)} 
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
                                    {lesEtudiants && lesNotes && <DataTableExtensions
                                        {...createTableNotes(lesNotes)} 
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

                    {/* 

                        <div className="col-12 col-lg-12 col-xl-9">
                        <div className="row">
                            <div className="col-12 col-lg-8 col-xl-8 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <div className="row align-items-center">
                                            <div className="col-6">
                                                <h5 className="card-title">Upcoming Lesson</h5>
                                            </div>
                                            <div className="col-6">
                                                <span className="float-right view-link">
                                                <a href="#">View All Courses</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-3 pb-3">
                                        <div className="table-responsive lesson">
                                            <table className="table table-center">
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="date">
                                                            <b>Aug 4, Tuesday</b>
                                                            <p>2.30pm - 3.30pm (60min)</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="date">
                                                            <b>Lessons 30</b>
                                                            <p>3.1 Ipsuum dolor</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="#">Confirmed</a>
                                                    </td>
                                                    <td>
                                                    <button type="submit" className="btn btn-info">
                                                        Reschedule
                                                    </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="date">
                                                            <b>Aug 5, Wednesday</b>
                                                            <p>3.00pm - 4.30pm (90min)</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="date">
                                                            <b>Lessons 31</b>
                                                            <p>3.2 Ipsuum dolor</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="#">Confirmed</a>
                                                    </td>
                                                    <td>
                                                        <button type="submit" className="btn btn-info">
                                                            Reschedule
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="date">
                                                            <b>Aug 6, Thursday</b>
                                                            <p>11.00am - 12.00pm (20min)</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="date">
                                                            <b>Lessons 32</b>
                                                            <p>3.3 Ipsuum dolor</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                    <a href="#">Confirmed</a>
                                                    </td>
                                                    <td>
                                                    <button type="submit" className="btn btn-info">
                                                        Reschedule
                                                    </button>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 col-xl-4 d-flex">
                                    <div className="card flex-fill">
                                        <div className="card-header">
                                            <div className="row align-items-center">
                                            <div className="col-12">
                                                <h5 className="card-title">Semester Progress</h5>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="dash-widget">
                                            <div className="circle-bar circle-bar2">
                                                    <ProgressBar
                                                        width={20}
                                                        radius={45}
                                                        progress={50}
                                                        rotate={-180}
                                                        strokeWidth={7}
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
                                                        <b>50%</b>
                                                    
                                                </ProgressBar>
                                            </div>
                                            <div className="dash-info">
                                                <h6>Lesson Progressed</h6>
                                                <h4>
                                                    30 <span>/ 60</span>
                                                </h4>
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
                                                <h5 className="card-title">Teaching Activity</h5>
                                            </div>
                                            <div className="col-6">
                                                <ul className="list-inline-group text-right mb-0 pl-0">
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
                                        <h5 className="card-title">Teaching History</h5>
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
                        </div>*/}
                    </div>
                    
                    {/* /Student Dashboard */}
                    
            </div>
        )
}
export { TeacherDashboard };