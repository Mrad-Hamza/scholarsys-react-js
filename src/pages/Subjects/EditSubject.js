import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';

// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";


function EditSubject () {
    const subject = useLocation().state.subject;

    const [name, setName] = useState(subject.name);
    const [nameIsValid, setNameIsValid] = useState(false);

    const [level, setLevel] = useState(subject.niveau);
    const [levelIsValid, setlLevelIsValid] = useState(false);

    const [coef, setCoef] = useState(subject.coefficient);
    const [coefIsValid, setCoefIsValid] = useState(false);

    const [nbHeure, setNbHeure] = useState(subject.nbHeure);
    const [nbHeureIsValid, setNbHeureIsValid] = useState(false);

    const blockInvalidChar = e => ['+', '-'].includes(e.key) && e.preventDefault();

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

        const handleLevel = (level) => {
            if(level.target.value !== undefined){
                setlLevelIsValid(true);
            }
            else{
                setlLevelIsValid(false);
            }

            if(levelIsValid === true){
                setLevel(level.target.value)
            }
        }

        const handleCoef = (coef) => {
            if(coef.target.value !== undefined){
                setCoefIsValid(true);
                if(coef.target.value == 0){
                    setCoefIsValid(false)
                }
            }else{
                setCoefIsValid(false)
            }

            if(coefIsValid === true){
                setCoef(coef.target.value)
            }
        }

        const handleNbHeure = (nbHeure)=> {
            if(nbHeure.target.value !== undefined){
                setNbHeureIsValid(true);
                if(nbHeure.target.value == 0){
                    setNbHeureIsValid(false)
                }
            }else{
                setNbHeureIsValid(false)
            }

            if(nbHeureIsValid === true){
                setNbHeure(nbHeure.target.value)
            }
        }

        const handleSubmit = (subject) => {
            subject.preventDefault();
            if((nameIsValid === false) || (levelIsValid === false) || (coefIsValid === false) 
            || (nbHeureIsValid === false) ){
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
                            <h3 className="page-title">Edit Subject</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/subjects">Subject</a></li>
                                <li className="breadcrumb-item active">Edit Subject</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <Form   >
                                    <Row className="add-subject">
                                        <Col sm={12}>
                                            <h5 className="form-title"><span>Subject Information</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Subject Name</Form.Label>
                                                <Form.Control type="text" onChange={handleName} value={name} />          
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Niveau</Form.Label>
                                                <Form.Control as="select" onChange={handleLevel} value={level} >
                                                    <option disabled selected value>Choisir un niveau</option>	
                                                    <option>1ére</option>
                                                    <option>2éme</option>
                                                    <option>3éme</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Coefficient</Form.Label>
                                                <Form.Control type="number" min="0" onKeyDown={blockInvalidChar}
                                                    onChange={handleCoef} value ={coef} />          
                                            </Form.Group>
                                        </Col>
                                            
                                        <Col xs={12} sm={6} className="mb-4">
                                            <Form.Group>
                                                <Form.Label>Nombre d'heure</Form.Label>
                                                <Form.Control type="number" min="0" onKeyDown={blockInvalidChar}
                                                    onChange={handleNbHeure} value={nbHeure} /> 
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Button variant="outline-success" type="submit">
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
export { EditSubject };