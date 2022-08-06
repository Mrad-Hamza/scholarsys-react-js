import React, {useState} from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

function EditLevel () {

    const [desgniation,setdesgniation] = useState('hello');
    const[desgniationIsValid, setdesgniationIsValid] = useState(false);

    const [acronyme, setAcronyme] = useState('hell');
    const [acronymeIsValid, setAcronymeIsValid] = useState(false);

    const [formation, setFormation] = useState('ds');
    const [formationIsValid, setFormationIsValid] = useState(false);


    const handleDesgniation = (desgniation) =>{
        setdesgniationIsValid(true);
        if (desgniation.target.value !== undefined){
            if(desgniation.target.value.length < 3){
                setdesgniationIsValid(false)
            }

            if(desgniation.target.value.length > 20){
                setdesgniationIsValid(false)
            }
            
        }
        else{
            setdesgniationIsValid(false);
        }
        if(desgniationIsValid === true){
            setdesgniation(desgniation.target.value);
        }

        setdesgniation(desgniation.target.value)
    }

    const handleAcronyme = (acronyme) => {
        if(acronyme.target.value !== undefined){
            setAcronymeIsValid(true);

            if(acronyme.target.value.length > 6){
                setAcronymeIsValid(false);
            }
            if(acronyme.target.value.length < 2){
                setAcronymeIsValid(false);
            }
        }
        else{
            setAcronymeIsValid(false);
        }

        setAcronyme(acronyme.target.value)
    }

    const handleFormation = (formation)=>{
        if(formation.target.value !== undefined){
            setFormationIsValid(true);
        }else{
            setFormationIsValid(false);
        }

        setFormation(formation.target.value)
    }

    const handleSubmit = (level) => {
        level.preventDefault();
        if((desgniationIsValid === false) || (acronymeIsValid === false) || (formationIsValid === false)){
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
                            <h3 className="page-title">Edit Levels</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/levels">Levels</a></li>
                                <li className="breadcrumb-item active">Edit Level</li>
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
                                            <h5 className="form-title"><span>Level Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Level desgniation</Form.Label>
                                                <Form.Control type="text" onChange={handleDesgniation}
                                                value= {desgniation} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Level Acronyme</Form.Label>
                                                <Form.Control type="text"  onChange={handleAcronyme}
                                                value={acronyme} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Formation</Form.Label>
                                                <Form.Control as="select" onChange={handleFormation}
                                                value= {formation} >
                                                    <option disabled selected value>Choisir une formation</option>	
                                                    <option>DS</option>
                                                    <option>BI</option>
                                                    <option>TWIN</option>
                                                </Form.Control>
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
export { EditLevel };