import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';


function AddCharge() {
    let history = useHistory();

    const [designation,setDesignation] = useState();
    const [designationIsValid, setDesignationIsValid] = useState('form-control is-invalid');
    const [codeFacture, setCodeFacture] = useState();
    const [codeFactureIsValid, setCodeFactureIsValid] = useState('form-control is-invalid');
    const [montantFacture, setMtFacture] = useState();
    const [montantFactureIsValid, setMtFactureIsValid] = useState('form-control is-invalid');

    const handleDesignation = (designation)=>{
        if(designation.target.value !== undefined && designation.target.value !== ''){
            setDesignationIsValid('form-control is-valid')
            setDesignation(designation.target.value)
        }else{
            setDesignationIsValid('form-control is-invalid')
        }
    }

    const handleMtFacture = (montantFacture)=>{
        if(montantFacture.target.value !== undefined && montantFacture.target.value !== ''){
            if(montantFacture.target.value.match(/^(\d*\.{0,1}\d{0,3}$)/)){
            setMtFactureIsValid('form-control is-valid')
            setMtFacture(montantFacture.target.value)
            }else{
                setMtFactureIsValid('form-control is-invalid');
            }
        }else{
            setMtFactureIsValid('form-control is-invalid');
        }
    }

    const handleCodeFacture = (codeFacture)=>{
        if(codeFacture.target.value !== undefined && codeFacture.target.value !== ''){
            setCodeFactureIsValid('form-control is-valid')
            setCodeFacture(codeFacture.target.value)
        }else{
            setCodeFactureIsValid('form-control is-invalid');
        }
    }

    const handleSubmit = async (charge)=>{
        if(designationIsValid === 'form-control is-invalid' || montantFactureIsValid === 'form-control is-invalid'
        || codeFactureIsValid === 'form-control is-invalid'){
            toast.error('Form contain errors')
        }else{
            toast.success("Form has been submitted");
                charge.preventDefault();
                const response = await fetch('http://localhost:8000/createCharge', {
                method: 'POST',
                body: JSON.stringify({
                        designation: designation,
                        code_facture: codeFacture,
                        montant_facture: montantFacture,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                const data = await response.json();
                console.log(data);
                history.push('/charges');
            
        }
    }

        return (
            <div>
                <Toaster position="top-right" reverseOrder={false} />
                <div className="page-header">
                    <Row>
                        <Col sm={12}>
                            <h3 className="page-title">Add Charge</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/charges">Charges</a></li>
                                <li className="breadcrumb-item active">Add Charge</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col sm={12}>
                                            <h5 className="form-title"><span>Charge Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Charge designation</Form.Label>
                                                <Form.Control className={designationIsValid} type="text" 
                                                onChange={handleDesignation} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Montant facture</Form.Label>
                                                <Form.Control className={montantFactureIsValid} type="number" 
                                                onChange={handleMtFacture} />
                                            </Form.Group>
                                        </Col> 

                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Code Facture</Form.Label>
                                                <Form.Control className={codeFactureIsValid} type="text" 
                                                onChange={handleCodeFacture} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                                Submit
                                            </Button>
                                        </Col>                                        
                                    </Row>                                    
                                </Form>                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
}
export {AddCharge};