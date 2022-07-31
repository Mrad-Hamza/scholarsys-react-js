import React from 'react';

// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";


class EditSubject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fields : {} , errors : {}}
        this.state.fields["name"] = "ahla";
        this.state.fields["coefficient"] = "3";
        this.state.fields["nbHeure"] = "21";
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

        //coefficient
        if(!fields["coefficient"]){
            formIsValid = false;
            errors["coefficient"] = "Cannot be Empty";
        }

        //nbHeure
        if(!fields["nbHeure"]){
            formIsValid = false;
            errors["nbHeure"] = "Cannot be Empty";
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
        alert("Form submitted");
    }else{
        alert("Form has errors.")
    }

    }

    render() {
        const blockInvalidChar = e => ['+', '-'].includes(e.key) && e.preventDefault();
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
                                <Form onSubmit= {this.contactSubmit.bind(this)}>
                                    <Row>
                                        <Col sm={12}>
                                            <h5 className="form-title"><span>Subject Information</span></h5>
                                        </Col>

                                        <Col xs={12} sm={12} className="mt-5">
                                            <Form.Group>
                                                <Form.Label>Subject Name</Form.Label>
                                                <Form.Control type="text" onChange={this.handleChange.bind(this, "name")} 
                                                value={this.state.fields["name"]}/>
                                                 <span className="subject-error">{this.state.errors["name"]}</span>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Niveau</Form.Label>
                                                <Form.Control as="select">
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
                                                <Form.Control as="select">
                                                    <option disabled selected value>Choisir une formation</option>	
                                                    <option>Data Science</option>
                                                    <option>Business Inteligence</option>
                                                    <option>Cloud</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Coefficient</Form.Label>
                                                <Form.Control type="number" min="0" onKeyDown={blockInvalidChar}
                                                 onChange={this.handleChange.bind(this, "coefficient")} value={this.state.fields["coefficient"]} />
                                                 <span className="subject-error">{this.state.errors["coefficient"]}</span>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6} className="mb-4">
                                            <Form.Group>
                                                <Form.Label>Nombre d'heure</Form.Label>
                                                <Form.Control type="number" min="0" onKeyDown={blockInvalidChar}
                                                 onChange={this.handleChange.bind(this, "nbHeure")} value={this.state.fields["nbHeure"]} />
                                                 <span className="subject-error">{this.state.errors["nbHeure"]}</span>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Button variant="primary" type="submit">
                                                Edit
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
export { EditSubject };