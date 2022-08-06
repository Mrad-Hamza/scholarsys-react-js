import React, {useState} from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

function EditFormation() {

    const [name , setName] = useState('Louay');
    const [nameIsValid , setNameIsValid] = useState(false);

    const [mtAnn, setMtAnn] = useState(2000);
    const [mtAnnIsValid , setMtAnnIsValid] = useState(false);

    const [durAnn, setDurAnn] = useState(3);
    const [durAnnIsValid , setDurAnnIsValid] = useState(false);

    const [durMens, setDurMens] = useState(9);
    const [durMensIsValid , setDurMensIsValid] = useState(false);

    const [dtEch, setDtEch] = useState('1998-03-26');
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
            setMtAnn(mtAnn.target.value)
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
            setDurAnn(durAnn.target.value)
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
            setDtEch(dtEch.target.value)
        }
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
                            <h3 className="page-title">Edit Formations</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/formations">Formation</a></li>
                                <li className="breadcrumb-item active">Edit Formation</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit= {handleSubmit}>
                                    <Row>
                                        <Col sm={12}>
                                            <h5 className="form-title"><span>Formation Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Formation Name</Form.Label>
                                                <Form.Control type="text" onChange={handleName} value={name} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Montant Annuelle</Form.Label>
                                                <Form.Control type="number" min={0} onChange={handleMtAnnuelle} 
                                                value={mtAnn} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Duree Annuelle</Form.Label>
                                                <Form.Control type="number" min="0" onChange={handleDurAnn} 
                                                value={durAnn} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>    
                                                <Form.Label>Duree Mensuelle</Form.Label>
                                                <Form.Control type="number" min="0" onChange={handleDurMens} 
                                                value ={durMens} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Date d'écheance</Form.Label>
                                                <Form.Control type="date" onChange={handleDtEch} value={dtEch} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Button variant="primary" type="submit">
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
export { EditFormation };