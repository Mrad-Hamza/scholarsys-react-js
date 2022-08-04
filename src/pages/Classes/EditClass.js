import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class EditClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fields : {} , errors : {}}
        this.state.fields["name"] = "2eme";
        this.state.fields["desgniation"] = "ty fok";
        this.state.fields["formation"] = "DS"
        this.state.fields["niveau"] = "3éme";
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        //subjectName
        if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }
        
        if(typeof fields["name"] !== "undefined"){
            if(!fields["name"].match(/^[a-zA-Z1-9]+$/)){
                formIsValid = false;
                errors["name"] = "Only Letters";
            }
            if(fields["name"].length < 3){
                formIsValid = false;
                errors["name"] = "Subject name too short";
            }
            if(fields["name"].length > 20){
                formIsValid = false;
                errors["name"] = "Subject name too long";
            }
        }

        //Class desgniation 
        if(!fields["desgniation"]){
            formIsValid = false;
            errors["desgniation"] = "You must choose a level";
        }

        if(typeof fields["desgniation"] !== "undefined"){
            if(fields["desgniation"] > 10){
                formIsValid = false;
                errors["desgniation"] = "Desgniation too long";
            }

            if(fields["desgniation"] < 5){
                formIsValid = false;
                errors["desgniation"] = "Desgniation too short";
            }
        }

        //formation
        if(!fields["formation"]){
            formIsValid = false;
            errors["formation"] = "You must choose a formation";
        }

        //niveau
        if(!fields["niveau"]){
            formIsValid = false;
            errors["niveau"] = "Cannot be Empty";
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
                            <h3 className="page-title">Edit Class</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/formations">Classes</a></li>
                                <li className="breadcrumb-item active">Edit Class</li>
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
                                            <h5 className="form-title"><span>Class Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Class Name</Form.Label>
                                                <Form.Control type="" onChange={this.handleChange.bind(this, "name")}
                                                value={this.state.fields["name"]} />
                                                <span className="subject-error">{this.state.errors["name"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Class desgniation</Form.Label>
                                                <Form.Control type="text"
                                                onChange={this.handleChange.bind(this, "desgniation")}
                                                value={this.state.fields["desgniation"]} />
                                                <span className="subject-error">{this.state.errors["desgniation"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Formation</Form.Label>
                                                <Form.Control as="select" onChange={this.handleChange.bind(this, "formation")}
                                                value={this.state.fields["formation"]}>
                                                    <option disabled selected value>Choisir une Formation</option>	
                                                    <option>DS</option>
                                                    <option>TWIN</option>
                                                    <option>Cloud</option>
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
                                                    <option>1ére</option>
                                                    <option>2éme</option>
                                                    <option>3éme</option>
                                                </Form.Control>
                                                <span className="subject-error">{this.state.errors["niveau"]}</span>
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
export { EditClass };