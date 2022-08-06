import React, {useState} from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

function AddGrade () {

    const [type, setType] = useState();
    const [typeIsValid, setTypeIsValid] = useState(false);

    const [matiere, setMatiere] = useState();
    const [matiereIsValid, setlMatiereIsValid] = useState(false);

    const [etudiant, setEtudiant] = useState();
    const [etudiantIsValid, setEtudiantIsValid] = useState(false);

    const [prof, setProf] = useState();
    const [profIsValid, setProfIsValid] = useState(false);
    
    const [dtPass, setDtPass] = useState();
    const [dtPassIsValid, setDtPassIsValid] = useState(false);

    const handleType = (type) => {
        setTypeIsValid(true);
        if (type.target.value !== undefined){
            if(type.target.value.length < 3){
                setTypeIsValid(false)
            }

            if(type.target.value.length > 20){
                setTypeIsValid(false)
            }
            
        }else{
            setTypeIsValid(false);
        }

        if(typeIsValid === true){
            setType(type.target.value);
        }
    }

    const handleMatiere = (matiere) => {
        if(matiere.target.value !== undefined){
            setlMatiereIsValid(true);
        }else{
            setlMatiereIsValid(false)
        }

        if(matiereIsValid === true){
            setMatiere(matiere.target.value)
        }
    }

    const handleEtudiant = (etudiant) => {
        if(etudiant.target.value !== undefined){
            setEtudiantIsValid(true)
        }else{
            setEtudiantIsValid(false)
        }

        if(etudiantIsValid === true){
            setEtudiant(etudiant.target.value)
        }
    }

    const handleProf = (prof) => {
        if(prof.target.value !== undefined){
            setProfIsValid(true)
        }else{
            setProfIsValid(false)
        }

        if(profIsValid === true){
            setProf(prof.target.value)
        }
    }
    
    const handleDtPass = (dtPass) => {
        if(dtPass.target.value !== undefined){
            setDtPassIsValid(true)
        }else{
            setDtPassIsValid(false)
        }

        if(dtPassIsValid === true){
            setDtPass(dtPass.target.value)
        }
    }

    const handleSubmit = async (grade) => {
        grade.preventDefault();
        if((typeIsValid === false) || (matiereIsValid === false) || (etudiantIsValid === false) 
        || (profIsValid === false) || (dtPassIsValid === false) ){
            alert('Form contain errors');
            return false;
        }
        else{
            let confirm = window.confirm('Do you really want to submit the form?');
            if(confirm === true){
                grade.preventDefault();
                    const response = await fetch('http://localhost:8000/createNote', {
                    method: 'POST',
                    body: JSON.stringify({
                            type: type,
                            date_passage_examen: dtPass
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
                            <h3 className="page-title">Add Grades</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/grades">Grade</a></li>
                                <li className="breadcrumb-item active">Add Grade</li>
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
                                            <h5 className="form-title"><span>Grade Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Grade type</Form.Label>
                                                <Form.Control type="" onChange={handleType}/>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Matiere</Form.Label>
                                                <Form.Control as="select" onChange={handleMatiere}>
                                                    <option disabled selected value>Choisir une matiere</option>	
                                                    <option>Math</option>
                                                    <option>TLA</option>
                                                    <option>IDK</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Etudiant</Form.Label>
                                                <Form.Control as="select" onChange={handleEtudiant}>
                                                    <option disabled selected value>Choisir un etudiant</option>	
                                                    <option>Louay</option>
                                                    <option>Hamza</option>
                                                    <option>Abdou</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>    
                                                <Form.Label>Proffeseur</Form.Label>
                                                <Form.Control as="select" onChange={handleProf}>
                                                    <option disabled selected value>Choisir un prof</option>	
                                                    <option>Achref</option>
                                                    <option>Amine</option>
                                                    <option>Sirine</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Date passage examen</Form.Label>
                                                <Form.Control type="date" onChange={handleDtPass}/>
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
export { AddGrade };