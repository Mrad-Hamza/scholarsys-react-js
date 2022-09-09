import React,{useEffect,useState} from 'react';
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

function LevelsList () {
    const [data,setData] = useState();
    const [formation, setFormation] = useState();
    const [classes, setClasses] = useState();
    const [subjects, setSubjects] = useState();

    const deleteLevel = async (level)=>{
        var childSubject = false;
        var childClasse = false;
        subjects.map(subject =>{
            if (subject.niveauId == level.id){
                childSubject = true;
            }
        })

        classes.map(classe =>{
            if(classe.niveauId == level.id){
                childClasse = true
            }
        })

        if(childClasse === false && childSubject === false){
            toast.success('Level deleted')
                const response = await fetch('http://localhost:8000/niveau/'+level.id, {
                    method: 'DELETE'
                    });
                const data = await response.json();
                console.log(data);
                window.location.reload(false);
        }else{
            toast.error("You cannot delete this one because it contains child(s)");
        }
        
    }

    useEffect(() => {
        fetch('http://localhost:8000/niveaus')
        .then(response => { return response.json()})
        .then(niveaux => { setData(niveaux); console.log(niveaux) })

        fetch('http://localhost:8000/formations')
        .then(response => { return response.json()})
        .then(formations => { setFormation(formations) })

        fetch('http://localhost:8000/matiere')
        .then(response => { return response.json()})
        .then(matiere => { setSubjects(matiere) })

        fetch('http://localhost:8000/classes')
        .then(response => { return response.json()})
        .then(classes => { setClasses(classes); })

    },[]);

    function getFormationById(id){
        var name = ''
        if(formation !== undefined){
            formation.map(formation =>{
                if(formation.id == id){
                    name = formation.nom
                }
            } )
        }
        return name;
    }

    const columns = [
        {
            name: 'Designation',
            sortable: true,
            selector: row=>row.designation,
        },
        {
            name: 'Acronyme',
            selector: row=>row.acronyme,
            sortable: true,
        },
        {
            name: 'Formation',
            selector: row=>getFormationById(row.formationId),
            sortable: true,
        },
        {
            name: 'Action',
            selector: row=>row.action,
            sortable: true,
            center:true,
            cell: (level) => <div><Link to={{pathname :`/edit-level/${level.id}` , state: {level} }}
            className="btn btn-sm bg-success-light me-2">
            <FontAwesomeIcon icon={faPencilAlt} /> </Link>  <a href="#" className="btn btn-sm bg-danger-light " onClick={() => {deleteLevel(level)}}> <FontAwesomeIcon icon={faTrash} /> </a></div>
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
                                <h3 className="page-title">Levels</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Levels</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-end ms-auto">
                                <a href="/add-level" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
    
export { LevelsList };