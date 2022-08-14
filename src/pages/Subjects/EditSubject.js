import React, {useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { formatWithOptions } from 'util';


function EditSubject () {

    let history = useHistory();

        const [niveaux,setNiveaux] = useState([]);
        const [formations, setFormations] = useState([]);

        const levelItems = niveaux.map((niveau)=>{
            return(
                <option key={niveau.id} data-key={niveau.id}>{niveau.designation}</option>
            )
        })

        const formationItems = formations.map((formation)=>{
            return(
                <option key={'formation'+formation.id} data-key={formation.id}>{formation.nom}</option>
            )
        })

    const subject = useLocation().state.subject;

    const id = subject.id;

    const [name, setName] = useState(subject.designation);
    const [nameIsValid, setNameIsValid] = useState('form-control is-valid');

    const [formation, setFormation] = useState('');
    const [formationIsValid, setFormationIsValid] = useState('form-control is-valid');

    const [level, setLevel] = useState();
    const [levelIsValid, setlLevelIsValid] = useState('form-control is-valid');

    const [coef, setCoef] = useState(subject.coef);
    const [coefIsValid, setCoefIsValid] = useState('form-control is-valid');

    const [nbHeure, setNbHeure] = useState(subject.nbr_heure);
    const [nbHeureIsValid, setNbHeureIsValid] = useState('form-control is-valid');

        useEffect(() => {

            fetch('http://localhost:8000/formations')
            .then(response => { return response.json()})
            .then(formation => { setFormations(formation) })

            fetch('http://localhost:8000/niveaus')
            .then(response => { return response.json()})
            .then(res => { var tableau = []
                for(var i=0; i <res.length; i++){
                    if(res[i].id == subject.niveauId){
                        tableau.push(res[i])
                        setLevel(res[i])
                    }
                }
                setNiveaux(tableau)
            }) 

        },[]);  

        useEffect(()=>{
            if(level != undefined){
                fetch('http://localhost:8000/formations')
                .then(response => { return response.json()})
                .then(formations => { 
                    for (var i=0; i<formations.length; i++){
                        if(formations[i].id == level.formationId){
                            setFormation(formations[i])
                        }
                    }
                 })
            }
        },[level])

        useEffect(()=>{
            fetch('http://localhost:8000/niveaus')
            .then(response => { return response.json()})
            .then(res => { var tableau = []
                for(var i=0; i <res.length; i++){
                    if(res[i].formationId == formation.id){
                        tableau.push(res[i])
                    }
                }
                setNiveaux(tableau)
            }) 
        },[formation])

        const blockInvalidChar = e => ['+', '-'].includes(e.key) && e.preventDefault();

        const handleName = (name) =>{
            if (name.target.value !== undefined){
                if(name.target.value == ''){
                    setNameIsValid('form-control is-invalid')
                }
                else if(name.target.value.length < 3){
                    setNameIsValid('form-control is-invalid')
                }
    
                else if(name.target.value.length > 20){
                    setNameIsValid('form-control is-invalid')
                }else{
                    setNameIsValid('form-control is-valid')
                    setName(name.target.value);
                }
            }
            else{
                setNameIsValid('form-control is-invalid');
            }
        }

        const handleFormation = (formation)=>{
            if(formation.target.value !== undefined){
                setFormationIsValid(true);
                const selectedIndex = formation.target.options.selectedIndex;
                const id = formation.target.options[selectedIndex].getAttribute('data-key');
                formations.map(formation=>{
                    if(formation.id == id ){
                        setFormation(formation)
                        setFormationIsValid('form-control is-valid')
                    }
                })
            }else{
                setFormationIsValid('form-control is-invalid')
            }
        }

        const handleLevel = (level)=>{
            if(level.target.value !== undefined){
                setlLevelIsValid(true);
                const selectedIndex = level.target.options.selectedIndex;
                const id = level.target.options[selectedIndex].getAttribute('data-key');
                niveaux.map(niveau=>{
                    if(niveau.id == id ){
                        setLevel(niveau)
                        setlLevelIsValid('form-control is-valid')
                    }
                })
            }else{
                setlLevelIsValid('form-control is-invalid');
            }
            
        }

        const handleCoef = (coef) => {
            if(coef.target.value !== undefined){
                if(coef.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)){
                    if(coef.target.value == 0){
                        setCoefIsValid('form-control is-invalid')
                    }else{
                        setCoef(coef.target.value)
                        setCoefIsValid('form-control is-valid');
                    }
                }else{
                    setCoefIsValid('form-control is-invalid')
                }
            }else{
                setCoefIsValid('form-control is-invalid')
            }
        }

        const handleNbHeure = (nbHeure)=> {
            if(nbHeure.target.value !== undefined){
                if(nbHeure.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)){
                    if(nbHeure.target.value == 0){
                        setNbHeureIsValid('form-control is-invalid')
                    }else{
                        setNbHeure(nbHeure.target.value)
                        setNbHeureIsValid('form-control is-valid');
                    }
                }else{
                    setNbHeureIsValid('form-control is-invalid');
                }
            }else{
                setNbHeureIsValid('form-control is-invalid')
            }
        }

        const handleSubmit = async (subject) => {
            subject.preventDefault();
            if((nameIsValid === 'form-control is-invalid') || (levelIsValid === 'form-control is-invalid') 
            || (coefIsValid === 'form-control is-invalid') || (nbHeureIsValid === 'form-control is-invalid') ){
                
            }
            else{
                let confirm = window.confirm('Do you really want to submit the form?');
                if(confirm === true){
                    subject.preventDefault();
                    console.log(level)
                    const response = await fetch('http://localhost:8000/matiere/'+id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                            designation: name,
                            coef: coef,
                            nbr_heure: nbHeure,
                            niveauId: level.id
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    });
                    const data = await response.json();
                    console.log(data);
                    alert("Form has been submitted");
                    history.push('/subjects')
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

                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Subject Name</Form.Label>
                                                <Form.Control className={nameIsValid} type="text" onChange={handleName} defaultValue={name} /> 
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                                <Form.Group>
                                                    <Form.Label>Formation</Form.Label>
                                                    <Form.Control className={formationIsValid} as="select" onChange={handleFormation} value={formation && formation.nom}>
                                                        <option>Choose a formation</option>	
                                                        {formations && formationItems}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Niveau</Form.Label>
                                                <Form.Control className={levelIsValid} as="select" onChange={handleLevel} value={level && level.designation} >
                                                    <option>Choose a level</option>	
                                                    {niveaux && levelItems}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Coefficient</Form.Label>
                                                <Form.Control className={coefIsValid} type="number" min="0" onKeyDown={blockInvalidChar}
                                                    onChange={handleCoef} defaultValue ={coef} />  
                                            </Form.Group>
                                        </Col>
                                            
                                        <Col xs={12} sm={6} className="mb-4">
                                            <Form.Group>
                                                <Form.Label>Nombre d'heure</Form.Label>
                                                <Form.Control className={nbHeureIsValid} type="number" min="0" onKeyDown={blockInvalidChar}
                                                    onChange={handleNbHeure} defaultValue={nbHeure} /> 
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Button type="submit" onClick={handleSubmit}>
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