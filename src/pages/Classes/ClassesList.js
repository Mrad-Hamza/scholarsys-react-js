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

const deleteClasse = async (classe)=>{
        toast.success('Classe deleted')
        const response = await fetch('http://localhost:8000/classe/'+classe.id, {
            method: 'DELETE'
            });
            const data = await response.json();
            console.log(data);
            window.location.reload(false);
}

function ClassesList() {
    const dispatch = useDispatch();

    const [data,setData] = useState();
    const [niveau, setNiveau] = useState();
    const [formation, setFormation] = useState();

    useEffect(() => {
        fetch('http://localhost:8000/classes')
        .then(response => { return response.json()})
        .then(classes => { setData(classes); })

        fetch('http://localhost:8000/niveaus')
        .then(response => { return response.json()})
        .then(niveaux => { setNiveau(niveaux); })

        fetch('http://localhost:8000/formations')
        .then(response => { return response.json()})
        .then(formation => { setFormation(formation); })
        
    },[]);

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
            selector: row=>row.nom
        },
        {
            name: 'desgniation',
            selector: row=>row.designation,
            sortable: true
        },
        {
            name: 'Formation',
            selector: row => getFormationByNiveau(row.niveauId),
            sortable: true
        },
        {
            name: 'Niveau',
            selector: row=>getNiveauById(row.niveauId),
            sortable: true
        },
        
        {
            name: 'Action',
            selector: row=>row.action,
            sortable: true,
            cell: (classes) => <div><Link to={{pathname:`/edit-class/${classes.id}` ,state: {classes: classes} }}
             className="btn btn-sm bg-success-light me-2">
            <FontAwesomeIcon icon={faPencilAlt} /> </Link>  <a href="#" className="btn btn-sm bg-danger-light " onClick={() => {deleteClasse(classes)}}> <FontAwesomeIcon icon={faTrash} /> </a></div>
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
                                <h3 className="page-title">Classes</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Classes</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-end ms-auto">
                                <a href="/add-class" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export {ClassesList};