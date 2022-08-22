import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function AddClass() {
    let history = useHistory();

    const [levels,setLevels] = useState([]);
    const [formations, setFormations] = useState([]);

    const levelItems = levels.map((level)=>{
        return(
            <option key={'level'+level.id} data-key={level.id}>{level.designation}</option>
        )
    })

    const formationItems = formations.map((formation)=>{
        return(
            <option key={'formation'+formation.id} data-key={formation.id}>{formation.nom}</option>
        )
    })

    const [name, setName] = useState('');
    const [nameIsValid, setNameIsValid]= useState('form-control is-invalid');

    const [desgniation, setDesignation] = useState('');
    const [desgniationIsValid, setDesignationIsValid] = useState('form-control is-invalid');

    const [formation, setFormation] = useState('');
    const [formationIsValid, setFormationIsValid] = useState('form-control is-invalid');

    const [niveau, setNiveau] = useState('');
    const[niveauIsValid, setNiveauIsValid] = useState('form-control is-invalid');

    useEffect(() => {
         fetch('http://localhost:8000/formations')
        .then(response => { return response.json()})
        .then(formation => { setFormations(formation) })

        fetch('http://localhost:8000/niveaus')
            .then(response => { return response.json()})
            .then(res => { 
                var tableau = [];
                for(var i=0; i<res.length; i++){
                    if(res[i].formationId == formation.id){
                        tableau.push(res[i])
                    }
                }
                setLevels(tableau)     
            })
    },[formation]);  

    const handleName = (name) =>{
            if (name.target.value !== undefined || name.target.value !== ''){
                setNameIsValid(true);
                if(name.target.value == ''){
                    setNameIsValid('form-control is-invalid')
                }
                else if(name.target.value.length < 3){
                    setNameIsValid('form-control is-invalid')
                }
                else if(name.target.value.length > 30){
                    setNameIsValid('form-control is-invalid')
                }else{
                    setName(name.target.value);
                    setNameIsValid('form-control is-valid')
                }
            }
            else{
                setNameIsValid('form-control is-invalid');
            }
    }

    const handleDesgniation = (desgniation) =>{
            if (desgniation.target.value !== undefined || desgniation.target.value !== '' ){
                if(desgniation.target.value == ''){
                    setDesignationIsValid('form-control is-invalid')

                }
                else if(desgniation.target.value.length < 3){
                    setDesignationIsValid('form-control is-invalid')
                }

                else if(desgniation.target.value.length > 10){
                    setDesignationIsValid('form-control is-invalid')
                }else{
                    setDesignation(desgniation.target.value);
                    setDesignationIsValid('form-control is-valid');
                }
                
            }else{
                setDesignationIsValid('form-control is-invalid');
            }
    }

    const handleNiveau = (niveau)=>{
        if(niveau.target.value !== undefined){
            const selectedIndex = niveau.target.options.selectedIndex;
            const id = niveau.target.options[selectedIndex].getAttribute('data-key');
            levels.map(level=>{
                if(level.id == id){
                    setNiveau(level)
                    setNiveauIsValid('form-control is-valid')
                }
            })
        }else{
            setNiveauIsValid('form-control is-invalid');
        }
    }

    const handleFormation = (formation)=>{
        if(formation.target.value !== undefined){
            setFormationIsValid(true);
            const selectedIndex = formation.target.options.selectedIndex;
            const id = formation.target.options[selectedIndex].getAttribute('data-key');
            formations.map(formation => {
                if(formation.id == id ){
                    setFormation(formation)
                    setFormationIsValid('form-control is-valid');
                }
            })
        }
    }

    const handleSubmit = async (classes) => {
        classes.preventDefault();
        if((nameIsValid === 'form-control is-invalid') || (desgniationIsValid === 'form-control is-invalid') 
        || (niveauIsValid === 'form-control is-invalid') ){
            toast.error('Form contains errors')
        }
        else{
            toast.success("Form has been submitted");
                classes.preventDefault();
                const response = await fetch('http://localhost:8000/createClasse', {
                method: 'POST',
                body: JSON.stringify({
                        nom: name,
                        designation: desgniation,
                        niveauId: niveau.id,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                const data = await response.json();
                console.log(data);
                history.push('/classes');
        }
    }

        return (
            <div>
                <Toaster position="top-right" reverseOrder={false} />
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
                                                <Form.Control className={nameIsValid} type="text"
                                                onChange={handleName} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Class desgniation</Form.Label>
                                                <Form.Control className={desgniationIsValid} type="text"
                                                onChange={handleDesgniation} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Formation</Form.Label>
                                                <Form.Control className={formationIsValid} as="select" 
                                                onChange={handleFormation}>
                                                    <option disabled selected value>Select a formation</option>	
                                                    {formations && formationItems}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>  

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Level</Form.Label>
                                                <Form.Control className={niveauIsValid} as="select" onChange={handleNiveau}>
                                                    <option disabled selected value>Choisir un niveau</option>	
                                                    {levels && levelItems}
                                                </Form.Control>
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