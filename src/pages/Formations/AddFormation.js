import React, { useEffect, useState } from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function AddFormation(){
    const [name , setName] = useState('');
    const [nameIsValid , setNameIsValid] = useState('form-control is-invalid');

    const [mtAnn, setMtAnn] = useState('');
    const [mtAnnIsValid , setMtAnnIsValid] = useState('form-control is-invalid');

    const [durAnn, setDurAnn] = useState('');
    const [durAnnIsValid , setDurAnnIsValid] = useState('form-control is-invalid');

    const [durMens, setDurMens] = useState('');
    const [durMensIsValid , setDurMensIsValid] = useState('form-control is-invalid');

    const [dtEch, setDtEch] = useState('');
    const [dtEchIsValid , setDtEchIsValid] = useState('form-control is-invalid');

    let history = useHistory();


    const handleName = (name) =>{
        if (name.target.value !== undefined || name.target.value !== ''){
            if((name.target.value === '') || (name.target.value.length < 3) || (name.target.value.length > 20) ){
                setName(null)
                setNameIsValid('form-control is-invalid');
            }else{
                setNameIsValid('form-control is-valid')
                setName(name.target.value)
            }
            
        }
        else{
            setNameIsValid('form-control is-invalid');
            setName(null)
        }
    }

    const handleMtAnnuelle = (mtAnn) => {
        if(mtAnn.target.value !== undefined || mtAnn.target.value !== ''){
            if(mtAnn.target.value.match(/^(\d*\.{0,1}\d{0,3}$)/)){
                if(mtAnn.target.value == 0){
                    setMtAnn('')
                    setMtAnnIsValid('form-control is-invalid');
                }else{
                    setMtAnnIsValid('form-control is-valid');
                    setMtAnn(mtAnn.target.value);
                }
            }else{
                setMtAnn('')
                setMtAnnIsValid('form-control is-invalid');
            }
            
        }
        else{
            setMtAnnIsValid('form-control is-invalid');
            setMtAnn('')
        }
    }

    const handleDurAnn = (durAnn) =>{
        if(durAnn.target.value !== undefined || durAnn.target.value !== ''){
            if(durAnn.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)){
                if(durAnn.target.value == 0){
                    setDurAnn(null)
                    setDurAnnIsValid('form-control is-invalid')
                }else{
                    setDurAnn(durAnn.target.value);
                    setDurAnnIsValid('form-control is-valid')
                }
            }
            else{
                setDurAnnIsValid('form-control is-invalid')
                setDurAnn(null)
            }
        }else{
            setDurAnnIsValid('form-control is-invalid')
            setDurAnn(null)
        }
    }

    const handleDurMens = (durMens)=>{
        if(durMens.target.value !== undefined || durMens.target.value !== '' ){
            if(durMens.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)){
                if(durMens.target.value == 0){
                    setDurMensIsValid('form-control is-invalid');
                    setDurMens(null)
                }else{
                    setDurMens(durMens.target.value)
                    setDurMensIsValid('form-control is-valid')
                }
            }else{
                setDurMensIsValid('form-control is-invalid')
                setDurMens(null)
            }
        }
        else{
            setDurMensIsValid('form-control is-invalid')
            setDurMens(null)
        }
    }

    const handleDtEch = (dtEch) =>{
        if(dtEch.target.value !== undefined && dtEch.target.value !== ''){
            setDtEchIsValid('form-control is-valid');
            setDtEch(dtEch.target.value);
        }
        else{
            setDtEchIsValid('form-control is-invalid');
            setDtEch(null)
        }
    }

    const handleSubmit = async (formation) => {
        formation.preventDefault();
        if((nameIsValid ==='form-control is-invalid')|| (mtAnnIsValid === 'form-control is-invalid') 
        || (durAnnIsValid === 'form-control is-invalid') || (durMens === 'form-control is-invalid') ||
        (dtEchIsValid === 'form-control is-invalid')){
            toast.error('Form contains errors');
        }else{
                toast.success('Form has been submitted')
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
                history.push('/formations')
        }
    }


        return (
            <div>
                <Toaster position="top-right" reverseOrder={false} />
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
                                                <Form.Control className={nameIsValid} type="text" onChange={handleName} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Montant Annuelle</Form.Label>
                                                <Form.Control className={mtAnnIsValid} type="number" min={0} onChange={handleMtAnnuelle} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Duree Annuelle</Form.Label>
                                                <Form.Control className={durAnnIsValid} type="number" min="0" onChange={handleDurAnn} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>    
                                                <Form.Label>Duree Mensuelle</Form.Label>
                                                <Form.Control className={durMensIsValid} type="number" min="0" onChange={handleDurMens} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Date d'écheance</Form.Label>
                                                <Form.Control className={dtEchIsValid} type="date" onChange={handleDtEch} />
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