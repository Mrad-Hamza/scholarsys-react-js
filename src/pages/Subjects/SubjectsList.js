import React,{useState, useEffect} from 'react';
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

function SubjectsList () {     
    
    const [data,setData] = useState();
    const [niveau, setNiveau] = useState();
    const [formation, setFormation] = useState();
    const [grades,setGrades] = useState();

    useEffect(() => {
        fetch('http://localhost:8000/matiere')
        .then(response => { return response.json()})
        .then(matiere => { setData(matiere) })

        fetch('http://localhost:8000/niveaus')
        .then(response => { return response.json()})
        .then(niveaux => { setNiveau(niveaux); })

        fetch('http://localhost:8000/formations')
        .then(response => { return response.json()})
        .then(formation => { setFormation(formation); })

        fetch('http://localhost:8000/note')
        .then(response => { return response.json()})
        .then(notes => { setGrades(notes) })
    },[]);

    const deleteSubject = async (subject)=>{
        var child = false;
        grades.map(grade =>{
            if (grade.matiereId == subject.id){
                child = true;
            }
        })

        if(child === false){
            let confirm = window.confirm('Do you really want to delete '+subject.designation+'?');
            if(confirm === true){
                const response = await fetch('http://localhost:8000/matiere/'+subject.id, {
                    method: 'DELETE'
                    });
                    const data = await response.json();
                    console.log(data);
            }
        }else{
            alert("You cannot delete this one because it contains child(s)");
        }
        
    }

    function getNiveauById(id){
        var name = ''
        if(niveau !== undefined){
            niveau.map(niveau =>{
                if(niveau.id == id){
                    name = niveau.designation
                }
            } )
        }
        return name;
    }

    function getFormationByNiveau(id){
        var name = '';
        var formationId;
        if(niveau !== undefined){
            niveau.map(niveau => {
                if(niveau.id == id){
                    formationId = niveau.formationId;
                    if(formation !== undefined){
                        formation.map(formation =>{
                            if(formation.id == formationId){
                                name = formation.nom
                            }
                        })
                    }
                }
            })
        }
        return name;
    }

    
const columns = [
    {
        name: 'Name',
        sortable: true,
        selector: row=>row.designation
    },
    {  
        name: 'Formation',
        sortable: true,
        selector: row => getFormationByNiveau(row.niveauId)
    },
    {
        name: 'Niveau',
        selector: row=>getNiveauById(row.niveauId),
        sortable: true,
    },
    {
        name: 'Coefficient',
        selector: row=>row.coef,
        sortable: true,
    },
    {
        name: 'Nombre Dheure',
        selector: row=>row.nbr_heure,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row=>row.action,
        sortable: true,
        cell: (subject) => <div> <Link to={{ pathname: `/edit-subject/${subject.id}` , state: {subject} }} 
                            className="btn btn-sm bg-success-light me-2">
                            <FontAwesomeIcon icon={faPencilAlt} /> </Link> 
                            <a href="#" className="btn btn-sm bg-danger-light" onClick={() => {deleteSubject(subject)}}> <FontAwesomeIcon icon={faTrash} /> </a>
                        </div>
    },
];

        const tableData = {
            columns,
            data,
        };

        return (
            <div>
                <div className="page-header">
                    <div className="page-header">
                        <Row>
                            <Col className="col">
                                <h3 className="page-title">Subjects</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Subjects</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-right ms-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-subject" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { SubjectsList };