import React from 'react';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

class EditFormation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fields : {} , errors : {}}
        this.state.fields["name"] = "ahla";
        this.state.fields["mtAnn"] = "20";
        this.state.fields["dureeAnn"] = "2"
        this.state.fields["dureeMens"] = "3";
        this.state.fields["dtEcheance"] = '21/03/1998';
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

        //Montant Annuelle
        if(!fields["mtAnn"]){
            formIsValid = false;
            errors["mtAnn"] = "You must choose a level";
        }

        //Duree Annuelle
        if(!fields["dureeAnn"]){
            formIsValid = false;
            errors["dureeAnn"] = "You must choose a formation";
        }

        //Duree Mensuelle
        if(!fields["dureeMens"]){
            formIsValid = false;
            errors["dureeMens"] = "Cannot be Empty";
        }

        //Date Echeance
        if(!fields["dtEcheance"]){
            formIsValid = false;
            errors["dtEcheance"] = "Cannot be Empty";
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
                            <h3 className="page-title">Edit Formation</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/formations">Formations</a></li>
                                <li className="breadcrumb-item active">Edit Formation</li>
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
                                            <h5 className="form-title"><span>Department Details</span></h5>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Formation Name</Form.Label>
                                                <Form.Control type="text" onChange={this.handleChange.bind(this, "name")}
                                                value={this.state.fields["name"]} />
                                                <span className="subject-error">{this.state.errors["name"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Montant Annuelle</Form.Label>
                                                <Form.Control type="text" placeholder="Please enter a number" prefix="$"
                                                onChange={this.handleChange.bind(this, "mtAnn")}
                                                value={this.state.fields["mtAnn"]} />
                                                <span className="subject-error">{this.state.errors["mtAnn"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Duree Annuelle</Form.Label>
                                                <Form.Control type="number" min="0" onChange={this.handleChange.bind(this, "dureeAnn")}
                                                value={this.state.fields["dureeAnn"]} />
                                                <span className="subject-error">{this.state.errors["dureeAnn"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Duree Mensuelle</Form.Label>
                                                <Form.Control type="number" min="0" onChange={this.handleChange.bind(this, "dureeMens")}
                                                value={this.state.fields["dureeMens"]} />
                                                <span className="subject-error">{this.state.errors["dureeMens"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Date d'écheance</Form.Label>
                                                <Form.Control type="date" onChange={this.handleChange.bind(this, "dtEcheance")}
                                                value={this.state.fields["dtEcheance"]} />
                                                <span className="subject-error">{this.state.errors["dtEcheance"]}</span>
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
export { EditFormation };