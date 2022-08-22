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

const deleteCharge = async (charge)=>{
    toast.success('Charge has been deleted')
        const response = await fetch('http://localhost:8000/charge/'+charge.id, {
            method: 'DELETE'
            });
            const data = await response.json();
            console.log(data);
            window.location.reload(false);
}

function ChargesList() {

    const [data,setData] = useState([]);

    function format(date){
        var format = new Date(date)
        var options = {year: 'numeric', month: 'long',day: 'numeric'}
        return format.toLocaleDateString([],options)
    }

    useEffect(()=>{
        fetch('http://localhost:8000/charge')
        .then(response => { return response.json()})
        .then(charges => { setData(charges); })  
    },[])
    
    const columns = [
        {
            name: 'Designation',
            sortable: true,
            selector: row=>row.designation
        },
        {
            name: 'Facture Amount',
            selector: row=>row.montant_facture+' DT',
            sortable: true
        },
        {
            name: 'Facture Code',
            selector: row => row.code_facture,
            sortable: true,
        },
        {
            name: 'Creation Date',
            selector: row=>format(row.createdAt),
            sortable: true,
        },
        {
            name: 'Action',
            selector: row=>row.action,
            sortable: true,
            center:true,
            cell: (charge) => <div><Link to={{pathname:`/edit-charge/${charge.id}` ,state: {charges: charge} }}
             className="btn btn-sm bg-success-light me-2">
            <FontAwesomeIcon icon={faPencilAlt} /> </Link>  <a href="#" className="btn btn-sm bg-danger-light " onClick={() => {deleteCharge(charge)}}> <FontAwesomeIcon icon={faTrash} /> </a></div>
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
                                <h3 className="page-title">Charges</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Charges</li>
                                </ul>
                            </Col>
                            <Col className="col-auto text-end float-end ms-auto">
                                <a href="/add-charge" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></a>
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
export {ChargesList};