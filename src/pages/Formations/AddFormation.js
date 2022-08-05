import React, { useState } from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";


function AddFormation(){
    const [name , setName] = useState('');
    const [nameIsValid , setNameIsValid] = useState(false);

    const [mtAnn, setMtAnn] = useState('');
    const [mtAnnIsValid , setMtAnnIsValid] = useState(false);

    const [durAnn, setDurAnn] = useState('');
    const [durAnnIsValid , setDurAnnIsValid] = useState(false);

    const [durMens, setDurMens] = useState('');
    const [durMensIsValid , setDurMensIsValid] = useState(false);

    const [dtEch, setDrEch] = useState('');
    const [dtEchIsValid , setDtEchIsValid] = useState(false);

    const handleName = (name) =>{
        setNameIsValid(true);
        if (name.target.value !== undefined){
            if(name.target.value.length < 3){
                setNameIsValid(false)
            }

            if(name.target.value.length > 20){
                setNameIsValid(false)
            }
            
        }
        else{
            setNameIsValid(false);
        }
        if(nameIsValid === true){
            setName(name.target.value);
        }
    }

    const handleChange = () =>{

    }

    const handleSubmit = (formation) => {
        formation.preventDefault();
        if((nameIsValid === false) || (mtAnnIsValid === false) || (durAnnIsValid === false)
         || (durMensIsValid === false) || (dtEchIsValid === false)){
            alert('Form contain errors');
            return false;
        }
        else{
            let confirm = window.confirm('Do you really want to submit the form?');
            if(confirm === true){
                alert("Form has been submitted");
                return true
            }
            else{
                return false;
            }
        }
    }


        return (
            <div>
                <div className="page-header">
                    <Row>
                        <Col sm={12}>
                            <h3 className="page-title">Add Formations</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/formations">Formation</a></li>
                                <li className="breadcrumb-item active">Add Formation</li>
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
                                            <h5 className="form-title"><span>Formation Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Formation Name</Form.Label>
                                                <Form.Control type="text" onChange={handleName} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Montant Annuelle</Form.Label>
                                                <Form.Control type="text" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Duree Annuelle</Form.Label>
                                                <Form.Control type="number" min="0" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>    
                                                <Form.Label>Duree Mensuelle</Form.Label>
                                                <Form.Control type="number" min="0" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Date d'écheance</Form.Label>
                                                <Form.Control type="date" onChange={handleChange} />
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
export { AddFormation };