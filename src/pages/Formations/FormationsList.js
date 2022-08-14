import React, { useEffect,useState } from 'react';
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

function FormationsList (){ 
    const [data,setData] = useState();
    const [levels,setLevels] = useState();

    useEffect(()=>{
        fetch('http://localhost:8000/niveaus')
        .then(response => { return response.json()})
        .then(niveaux => { setLevels(niveaux); })  
    })

    const deleteFormation = async (formation)=>{
        var child = false;
        levels.map(level =>{
            if(level.formationId == formation.id){
                child = true
            }
        })

        if(child === false){
            let confirm = window.confirm('Do you really want to delete '+formation.nom+'?');
            if(confirm === true){
            const response = await fetch('http://localhost:8000/formation/'+formation.id, {
                method: 'DELETE'
                });
                const data = await response.json();
                console.log(data);
                window.location.reload(false);
            }
        }else{
            alert("You cannot delete this one because it contains child(s)");
        }
        
    }

    function format(date){
        var format = new Date(date)
        var options = {year: 'numeric', month: 'long',day: 'numeric'}
        return format.toLocaleDateString([],options)
    }

    useEffect(() => {
        fetch('http://localhost:8000/formations')
        .then(response => { return response.json()})
        .then(formations => { setData(formations) })
    },[]);

    const columns = [
        {
            name: 'Name',
            sortable: true,
            selector: row=>row.nom
        },
        {
            name: 'Montant annuelle',
            selector: row=>row.montant_anuelle,
            sortable: true,
        },
        {
            name: 'Duree Annuelle',
            selector: row=>row.duree_anuelle,
            sortable: true,
        },
        {
            name: 'Duree Mensuelle',
            selector: row=>row.duree_mensuelle,
            sortable: true,
        },
        {
            name: "Date d'écheances",
            selector: row => format(row.date_echeance),
            sortable: true,
        },
        {
            name: 'Action', 
            selector: row=>row.action,
            sortable: true,
            cell: (formation) => <div><Link to={{pathname: `/edit-formation/${formation.id}`, state:{formation} }} 
             className="btn btn-sm bg-success-light me-2">
            <FontAwesomeIcon icon={faPencilAlt} />
            </Link>
            <a href="#" className="btn btn-sm bg-danger-light " onClick={() => {deleteFormation(formation)}}> <FontAwesomeIcon icon={faTrash} /> </a></div>
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
                                <h3 className="page-title">Formations</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Formations</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-end ms-auto">
                                <a href="#" className="btn btn-outline-primary me-2"><FontAwesomeIcon icon={faDownload} /> Download</a>
                                <a href="/add-formation" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export { FormationsList };