import React, {useState,useEffect} from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

function EditClass(){

    const [name, setName] = useState('4éme année DS 2');
    const [nameIsValid, setNameIsValid]= useState(false);

    const [desgniation, setDesignation] = useState('4DS2');
    const [desgniationIsValid, setDesignationIsValid] = useState(false);

    const [niveau, setNiveau] = useState('1ére');
    const[niveauIsValid, setNiveauIsValid] = useState(false);

    const [formation, setFormation] = useState('DS');
    const [formationIsValid, setFormationIsValid] = useState(false);

    const handleName = (name) =>{
        setNameIsValid(true);
            if (name.target.value !== undefined){
                if(name.target.value.length < 3){
                    setNameIsValid(false)
                }
            }
            else{
                setNameIsValid(false);
            }
            if(nameIsValid === true){
                setName(name.target.value);
            }

            if(nameIsValid === true){
                setName(name.target.value);
            }
    }

    const handleDesgniation = (desgniation) =>{
        setDesignationIsValid(true);
            if (desgniation.target.value !== undefined){
                if(desgniation.target.value.length < 3){
                    setDesignationIsValid(false)
                }

                if(desgniation.target.value.length > 10){
                    setDesignationIsValid(false)
                }
                
            }
            else{
                setDesignationIsValid(false);
            }
            if(desgniationIsValid === true){
                setDesignation(desgniation.target.value);
            }
            
            if(desgniationIsValid === true){
                setDesignation(desgniation.target.value);
            }
    }

    const handleNiveau = (niveau) =>{
        if(niveau.target.value !== undefined){
            setNiveauIsValid(true);
        }else{
            setNiveauIsValid(false);
        }

        if(niveauIsValid === true){
            setNiveau(niveau.target.value);
        }
        
    }

    const handleFormation = (formation) =>{
        if(formation.target.value !== undefined){
            setFormationIsValid(true)
        }else{
            setFormationIsValid(false)
        }

        if(formationIsValid === true){
            setFormation(formation.target.value)
        }
    }

    const handleSubmit = (classes) => {
        classes.preventDefault();
        if((nameIsValid === false) || (desgniationIsValid === false) || (niveauIsValid === false) 
        || (formationIsValid === false) ){
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
                            <h3 className="page-title">Edit Class</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/classes">Classes</a></li>
                                <li className="breadcrumb-item active">Edit Class</li>
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
                                            <h5 className="form-title"><span>Class Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Class Name</Form.Label>
                                                <Form.Control type="text" onChange={handleName} value={name} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Class desgniation</Form.Label>
                                                <Form.Control type="text" onChange={handleDesgniation} value={desgniation} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Level</Form.Label>
                                                <Form.Control as="select" onChange={handleNiveau} value={niveau}>
                                                    <option disabled selected value>Choisir un niveau</option>	
                                                    <option>1ére</option>
                                                    <option>2éme</option>
                                                    <option>3éme</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Formation</Form.Label>
                                                <Form.Control as="select" onChange={handleFormation} value={formation}>
                                                    <option disabled selected value>Choisir une formation</option>	
                                                    <option>DS</option>
                                                    <option>BI</option>
                                                    <option>TWIN</option>
                                                </Form.Control>
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
export { EditClass };