import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class AddLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fields : {} , errors : {}}
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Level Name
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

        // Level Acronyme
        if(!fields["acronyme"]){
            formIsValid = false;
            errors["acronyme"] = "You need to specify an acronyme";
        }
        
        if(typeof fields["acronyme"] !== "undefined"){
            if(fields["acronyme"].length > 6){
                formIsValid = false;
                errors["acronyme"] = "Acronyme too long";
            }
    
            if(fields["acronyme"].length < 2){
                formIsValid = false;
                errors["acronyme"] = "Acronyme too short";
            }
        }

        //Formation
        if(!fields["formation"]){
            formIsValid = false;
            errors["formation"] = "You must choose a formation";
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
                            <h3 className="page-title">Add Levels</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/levels">Levels</a></li>
                                <li className="breadcrumb-item active">Add Level</li>
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
                                            <h5 className="form-title"><span>Level Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Level Name</Form.Label>
                                                <Form.Control type="text" onChange={this.handleChange.bind(this, "name")}
                                                value={this.state.fields["name"]} />
                                                <span className="subject-error">{this.state.errors["name"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Level Acronyme</Form.Label>
                                                <Form.Control type="text"  onChange={this.handleChange.bind(this, "acronyme")}
                                                value={this.state.fields["acronyme"]} />
                                                <span className="subject-error">{this.state.errors["acronyme"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={12}>
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
export { AddLevel };