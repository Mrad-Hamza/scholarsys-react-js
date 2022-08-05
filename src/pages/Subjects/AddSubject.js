    import React, {useState} from 'react';
    // Import Components
    import { Row, Col, Card, Form, Button } from "react-bootstrap";
    
    function AddSubject () {

        const [name, setName] = useState();
        const [nameIsValid, setNameIsValid] = useState(false);

        const [level, setLevel] = useState();
        const [levelIsValid, setlLevelIsValid] = useState(false);

        const [coef, setCoef] = useState();
        const [coefIsValid, setCoefIsValid] = useState(false);

        const [nbHeure, setNbHeure] = useState();
        const [nbHeureIsValid, setNbHeureIsValid] = useState(false);

        const blockInvalidChar = e => ['+', '-'].includes(e.key) && e.preventDefault();
    
        const handleChange = () =>{
    
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
                                <h3 className="page-title">Add Subject</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/subjects">Subject</a></li>
                                    <li className="breadcrumb-item active">Add Subject</li>
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
    
                                            <Col xs={12} sm={12} className="mt-5">
                                                <Form.Group>
                                                    <Form.Label>Subject Name</Form.Label>
                                                    <Form.Control type="text" onChange={handleChange}/>          
                                                </Form.Group>
                                            </Col>
    
                                            <Col xs={12} sm={6}>
                                                <Form.Group>
                                                    <Form.Label>Formation</Form.Label>
                                                    <Form.Control as="select" onChange={handleChange}>
                                                        <option disabled selected value>Choisir une formation</option>	
                                                        <option>Data Science</option>
                                                        <option>Business Inteligence</option>
                                                        <option>Cloud</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
    
                                            <Col xs={12} sm={6}>
                                                <Form.Group>
                                                    <Form.Label>Niveau</Form.Label>
                                                    <Form.Control as="select" onChange={handleChange}>
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
                                                        onChange={handleChange}/>          
                                                </Form.Group>
                                            </Col>
                                                
                                            <Col xs={12} sm={6} className="mb-4">
                                                <Form.Group>
                                                    <Form.Label>Nombre d'heure</Form.Label>
                                                    <Form.Control type="number" min="0" onKeyDown={blockInvalidChar}
                                                        onChange={handleChange} /> 
                                                </Form.Group>
                                            </Col>
    
                                            <Col xs={12}>
                                                <Button variant="outline-success" type="submit" onClick={handleSubmit}>
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
    
    export { AddSubject };