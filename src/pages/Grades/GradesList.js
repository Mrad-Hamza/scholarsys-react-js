import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
// Import Components
import { Row, Col, Card, Media } from "react-bootstrap";
//Import Data Table
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPencilAlt, faPlus, faTrash } from '@fortawesome/fontawesome-free-solid';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { allStudents, allTeachers } from '../../slices/users';

const deleteGrade = async (grade)=>{
    toast.success('Grade has been deleted');
        const response = await fetch('http://localhost:8000/note/'+grade.id, {
            method: 'DELETE'
            });
            const data = await response.json();
            console.log(data);
            window.location.reload(false);
}

function GradesList () {
    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.users.teachers);
    const students = useSelector((state) => state.users.students)

    const [data,setData] = useState([]);
    const [matieres, setMatieres] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/note')
        .then(response => { return response.json()})
        .then(notes => { setData(notes) })

        fetch('http://localhost:8000/matiere')
        .then(response => { return response.json()})
        .then(matieres => { setMatieres(matieres) })

        dispatch(allStudents())
        dispatch(allTeachers())
    },[]);

    function format(date){
        var format = new Date(date)
        var options = {year: 'numeric', month: 'long',day: 'numeric'}
        return format.toLocaleDateString([],options)
    }

    function getMatiereName(id){
        var matiereName = ''
        if(matieres !== undefined){
            matieres.map(matiere =>{
                if(matiere.id == id){
                    matiereName = matiere.designation
                }
            } )
        }
        return matiereName;
    }

    function getTeacherById(id){
        var teacherName= ''
        if(teachers !== undefined){
            teachers.map(teacher => {
                if(teacher.id == id){
                    teacherName= teacher.firstname + ' ' + teacher.lastname
                }
            })
            return teacherName
        }
    }

    function getStudentById(id){
        var studentName= ''
        if(students !== undefined){
            students.map(student => {
                if(student.id == id){
                    studentName= student.firstname + ' ' + student.lastname
                }
            })
            return studentName
        }
    }

    const columns = [
        {
            name: 'Type',
            sortable: true,
            selector: row=>row.type,
        },
        {
            name: 'Note',
            sortable: true,
            selector: row=>row.note_val+'/20',
        },
        {
            name: 'Subject',
            selector: row=>getMatiereName(row.matiereId),
            sortable: true,
        },
        {
            name: 'Student',
            sortable: true,
            selector: row => getStudentById(row.studentId),
            center: true
        },
        {
            name:'Teacher',
            sortable: true,
            selector: row=>getTeacherById(row.teacherId),
            center:true
        },
        {
            name: 'Date de passation',
            selector: row=>format(row.date_passage_examen),
            sortable: true,
            width: '200px',
            center:true
        },
        {
            name: 'Action',
            selector: row=>row.action,
            sortable: true,
            width: '120px',
            center:true,
            cell: (grade) => <div><Link to={{pathname :`/edit-grade/${grade.id}` ,state: {grade} }} className="btn btn-sm bg-success-light me-2">
            <FontAwesomeIcon icon={faPencilAlt} /> </Link>  
            <a href="#" className="btn btn-sm bg-danger-light " onClick={() => {deleteGrade(grade)}}> <FontAwesomeIcon icon={faTrash} /> </a></div>
        },
    ];
   
    const tableData = {
            columns,
            data,
        };

        return (
            <div>
                <Toaster position="top-right" reverseOrder={false} />
                <div className="page-header">
                    <div className="page-header">
                        <Row>
                            <Col className="col">
                                <h3 className="page-title">Grades</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Grades</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-end ms-auto">
                                <a href="/add-grade" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
                            </Col>
                        </Row>
                    </div>
                </div>

                <Card>
                    <DataTableExtensions
                        {...tableData}
                    >
                        <DataTable
                            noHeader
                            defaultSortField="id"
                            defaultSortAsc={false}
                            pagination
                            highlightOnHover
                        />
                    </DataTableExtensions>
                </Card>
            </div>
        )
}
export { GradesList };