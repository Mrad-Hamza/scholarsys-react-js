import React, {useState, useEffect} from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

function AddClass() {
    const [name, setName] = useState('');
    const [nameIsValid, setNameIsValid] = useState(false);
    const [desgniation, setDesignation] = useState('');
    const [desgniationIsValid, setDesignationIsValid] = useState(false);

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

    const handleDesgniation = (desgniation) =>{
        setDesignationIsValid(true);
            if (desgniation.target.value !== undefined){
                if(desgniation.target.value.length < 3){
                    setDesignationIsValid(false)
                }

                if(desgniation.target.value.length > 20){
                    setDesignationIsValid(false)
                }
                
            }
            else{
                setDesignationIsValid(false);
            }
            if(desgniationIsValid === true){
                setDesignation(desgniation.target.value);
            }
    }

    const handleSubmit = (classes) => {
        classes.preventDefault();
        if((nameIsValid === false) || (desgniationIsValid === false) ){
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
                            <h3 className="page-title">Add Classes</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/classes">Classes</a></li>
                                <li className="breadcrumb-item active">Add Class</li>
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
                                                <Form.Control type="text" defaultValue={name} onChange={handleName} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Class desgniation</Form.Label>
                                                <Form.Control type="text"
                                                defaultValue={desgniation} onChange={handleDesgniation} />
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
export {AddClass};