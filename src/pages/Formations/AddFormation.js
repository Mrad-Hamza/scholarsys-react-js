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

    const [dtEch, setDtEch] = useState('');
    const [dtEchIsValid , setDtEchIsValid] = useState(false);

    const handleName = (name) =>{
        if (name.target.value !== undefined){
            setNameIsValid(true);
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

    const handleMtAnnuelle = (mtAnn) => {
        if(mtAnn.target.value !== undefined){
            setMtAnnIsValid(true);
            if(mtAnn.target.value == 0){
                setMtAnnIsValid(false)
            }
        }
        else{
            setMtAnnIsValid(false);
        }

        if(mtAnnIsValid===true){
            setMtAnn(mtAnn.target.value);
        }
    }

    const handleDurAnn = (durAnn) =>{
        if(durAnn.target.value !== undefined){
            setDurAnnIsValid(true)
            if(durAnn.target.value == 0){
                setDurAnnIsValid(false)
            }
        }
        else{
            setDurAnnIsValid(false)
        }

        if(durAnnIsValid===true){
            setDurAnn(durAnn.target.value);
        }
    }

    const handleDurMens = (durMens)=>{
        if(durMens.target.value !== undefined ){
            setDurMensIsValid(true)
            if(durMens.target.value == 0){
                setDurMensIsValid(false);
            }
        }
        else{
            setDurMensIsValid(false)
        }

        if(durMensIsValid===true){
            setDurMens(durMens.target.value)
        }
    }

    const handleDtEch = (dtEch) =>{
        if(dtEch.target.value !== undefined){
            setDtEchIsValid(true);
        }
        else{
            setDtEchIsValid(false);
        }

        if(dtEchIsValid===true){
            setDtEch(dtEch.target.value);
        }
    }

    const handleSubmit = async (formation) => {
        formation.preventDefault();
        if((nameIsValid === false) || (mtAnnIsValid === false) || (durAnnIsValid === false)
         || (durMensIsValid === false) || (dtEchIsValid === false)){
            alert('Form contain errors');
            return false;
        }
        else{
            let confirm = window.confirm('Do you really want to submit the form?');
            if(confirm === true){
                formation.preventDefault();
                const response = await fetch('http://localhost:8000/createFormation', {
                method: 'POST',
                body: JSON.stringify({
                        nom: name,
                        montant_anuelle: mtAnn,
                        duree_anuelle: durAnn,
                        duree_mensuelle: durMens,
                        date_echeance: dtEch
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                const data = await response.json();
                console.log(data);
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
                                                <Form.Control type="number" min={0} onChange={handleMtAnnuelle} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Duree Annuelle</Form.Label>
                                                <Form.Control type="number" min="0" onChange={handleDurAnn} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>    
                                                <Form.Label>Duree Mensuelle</Form.Label>
                                                <Form.Control type="number" min="0" onChange={handleDurMens} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Date d'écheance</Form.Label>
                                                <Form.Control type="date" onChange={handleDtEch} />
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