import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class AddGrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fields : {} , errors : {}}
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        //subjectName
        if(!fields["type"]){
            formIsValid = false;
            errors["type"] = "Cannot be empty";
        }
        
        if(typeof fields["type"] !== "undefined"){
            if(!fields["type"].match(/^[a-zA-Z1-9]+$/)){
                formIsValid = false;
                errors["type"] = "Only Letters";
            }
            if(fields["type"].length < 3){
                formIsValid = false;
                errors["type"] = "Grade type too short";
            }
            if(fields["type"].length > 20){
                formIsValid = false;
                errors["type"] = "Grade name too long";
            }
        }

        //Formation
        if(!fields["formation"]){
            formIsValid = false;
            errors["formation"] = "You must choose a level";
        }

        //Niveau
        if(!fields["niveau"]){
            formIsValid = false;
            errors["niveau"] = "You must choose a formation";
        }

        //Matiere
        if(!fields["matiere"]){
            formIsValid = false;
            errors["matiere "] = "Cannot be Empty";
        }

        //Class 
        if(!fields["class"]){
            formIsValid = false;
            errors["class"] = "Cannot be Empty";
        }

        //Etudiant 
        if(!fields["etudiant"]){
            formIsValid = false;
            errors["etudiant"] = "Cannot be Empty";
        }

        //Prof 
        if(!fields["prof"]){
            formIsValid = false;
            errors["prof"] = "Cannot be Empty";
        }

        //date de passation 
        if(!fields["date"]){
            formIsValid = false;
            errors["date"] = "Cannot be Empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange(field, e){    		
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
      }

    contactSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
        let confirm = window.confirm('Do you really want to submit the form?');
        if(confirm === true){
            alert("Form has been submitted");
        }
    }else{
        alert("Form has errors.")
        return false;
    }

    }

    render() {
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
                                <Form onSubmit= {this.contactSubmit.bind(this)}>
                                    <Row>
                                        <Col sm={12}>
                                            <h5 className="form-title"><span>Grade Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Grade type</Form.Label>
                                                <Form.Control type="" onChange={this.handleChange.bind(this, "type")}
                                                value={this.state.fields["type"]} />
                                                <span className="subject-error">{this.state.errors["type"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Formation</Form.Label>
                                                <Form.Control as="select" onChange={this.handleChange.bind(this, "formation")}
                                                value={this.state.fields["formation"]}>
                                                    <option disabled selected value>Choisir une formation</option>	
                                                    <option>DS</option>
                                                    <option>BI</option>
                                                    <option>TWIN</option>
                                                </Form.Control>
                                                <span className="subject-error">{this.state.errors["formation"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Niveau</Form.Label>
                                                <Form.Control as="select" onChange={this.handleChange.bind(this, "niveau")}
                                                value={this.state.fields["niveau"]}>
                                                    <option disabled selected value>Choisir un niveau</option>	
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Form.Control>
                                                <span className="subject-error">{this.state.errors["niveau"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Matiere</Form.Label>
                                                <Form.Control as="select" onChange={this.handleChange.bind(this, "matiere")}
                                                value={this.state.fields["matiere"]}>
                                                    <option disabled selected value>Choisir une matiere</option>	
                                                    <option>Math</option>
                                                    <option>TLA</option>
                                                    <option>IDK</option>
                                                </Form.Control>
                                                <span className="subject-error">{this.state.errors["matiere"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Class</Form.Label>
                                                <Form.Control as="select" onChange={this.handleChange.bind(this, "class")}
                                                value={this.state.fields["class"]}>
                                                    <option disabled selected value>Choisir une class</option>	
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                </Form.Control>
                                                <span className="subject-error">{this.state.errors["class"]}</span>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Etudiant</Form.Label>
                                                <Form.Control as="select" onChange={this.handleChange.bind(this, "etudiant")}
                                                value={this.state.fields["etudiant"]}>
                                                    <option disabled selected value>Choisir un etudiant</option>	
                                                    <option>Louay</option>
                                                    <option>Hamza</option>
                                                    <option>Abdou</option>
                                                </Form.Control>
                                                <span className="subject-error">{this.state.errors["etudiant"]}</span>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>    
                                                <Form.Label>Proffeseur</Form.Label>
                                                <Form.Control as="select" onChange={this.handleChange.bind(this, "prof")}
                                                value={this.state.fields["prof"]}>
                                                    <option disabled selected value>Choisir un prof</option>	
                                                    <option>Achref</option>
                                                    <option>Amine</option>
                                                    <option>Sirine</option>
                                                </Form.Control>
                                                <span className="subject-error">{this.state.errors["prof"]}</span>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Date passage examen</Form.Label>
                                                <Form.Control type="date" onChange={this.handleChange.bind(this, "date")}
                                                value={this.state.fields["date"]} />
                                                <span className="subject-error">{this.state.errors["date"]}</span>
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
}
export { AddGrade };