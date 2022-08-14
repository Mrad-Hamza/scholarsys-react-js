import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { tab } from '@testing-library/user-event/dist/tab';

function reactFormat(date){
    var format = new Date(date)
    return format.toISOString().slice(0, 10)
}

function EditGrade () {

    let history = useHistory();

    const [matieres,setMatieres] = useState([]);
    const [levels,setLevels] = useState([]);
    const [formations, setFormations] = useState([]);
    const [classes, setClasses] = useState([]);

    const formationItems = formations.map((formation)=>{
        return(
            <option key={'formation'+formation.id} data-key={formation.id}>{formation.nom}</option>
        )
    })

    const levelItems = levels.map((level)=>{
        return(
            <option key={'level'+level.id} data-key={level.id}>{level.designation}</option>
        )
    })

    const classItems = classes.map((classes)=>{
        return(
          <option key={'class'+classes.id} data-key={classes.id}>{classes.nom}</option>   
        )
    })

    const items = matieres.map((matiere)=>{
        return(
            <option key={matiere.id} data-key={matiere.id}>{matiere.designation}</option>
        )
    })

    const grade = useLocation().state.grade;
    const id = grade.id;

    const [type, setType] = useState(grade.type);
    const [typeIsValid, setTypeIsValid] = useState('form-control is-valid');

    const [value,setValue] = useState(grade.value);
    const [valueIsValid, setValueIsValid] = useState('form-control is-valid');

    const [formation, setFormation] = useState();
    const [oldFormation, setOldFormation] = useState();
    const [formationIsValid, setFormationIsValid] = useState('form-control is-valid');

    const [niveau, setNiveau] = useState();
    const [niveauIsValid, setNiveauIsValid] = useState('form-control is-valid');

    const [matiere, setMatiere] = useState();
    const [matiereIsValid, setMatiereIsValid] = useState('form-control is-valid');

    const [classe, setClasse] = useState();
    const [classeIsValid, setClasseIsValid] = useState('form-control is-valid')

    const [etudiant, setEtudiant] = useState(grade.etudiant);
    const [etudiantIsValid, setEtudiantIsValid] = useState('form-control is-valid');

    const [prof, setProf] = useState(grade.prof);
    const [profIsValid, setProfIsValid] = useState('form-control is-valid');
    
    const [dtPass, setDtPass] = useState(reactFormat(grade.date_passage_examen));
    const [dtPassIsValid, setDtPassIsValid] = useState('form-control is-valid');

    useEffect(() => {
        fetch('http://localhost:8000/matiere')
            .then(response => { return response.json()})
            .then(res => { 
                var tableau = [];
                for(var i=0; i<res.length; i++){
                    if(res[i].id == grade.matiereId){
                        tableau.push(res[i])
                        setMatiere(res[i])
                    }
                }
                setMatieres(tableau)     
            })

        fetch('http://localhost:8000/formations')
        .then(response => { return response.json()})
        .then(formation => { setFormations(formation) })
    },[]);  

    useEffect(()=>{
        if(matiere !== undefined){
            fetch('http://localhost:8000/niveaus')
            .then(response => { return response.json()})
            .then(niveaux => { 
                var tableau = [];
                for(var i=0; i<niveaux.length; i++){
                    if(niveaux[i].id == matiere.niveauId){
                        tableau.push(niveaux[i])
                        setNiveau(niveaux[i])
                    }
                }
                setLevels(tableau)     
            })
        }
    },[matiere])

    useEffect(()=>{
        if(niveau != undefined){
            fetch('http://localhost:8000/formations')
            .then(response => { return response.json()})
            .then(formations => { 
                for (var i=0; i<formations.length; i++){
                    if(formations[i].id == niveau.formationId){
                        setOldFormation(formations[i])
                    }
                }
             })
        }
    },[niveau])

    useEffect(()=>{
        console.log('done')
        if(oldFormation !== undefined){
            fetch('http://localhost:8000/niveaus')
            .then(response => { return response.json()})
            .then(res => { 
                var tableau = [];
                for(var i=0; i<res.length; i++){
                    if(res[i].formationId == oldFormation.id){
                        tableau.push(res[i])
                    }
                }
                setLevels(tableau)     
            })
        }
    },[oldFormation])

    useEffect(()=>{
        setClasses([])
        setLevels([])
        setMatieres([])
        if(formation !== undefined){
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
        }
    },[formation])

    useEffect(()=>{
        setClasses([]);
        setMatieres([]);
        if(niveau !== undefined){
            fetch('http://localhost:8000/matiere')
            .then(response => { return response.json()})
            .then(res => { 
                var tableau = [];
                for(var i=0; i<res.length; i++){
                    if(res[i].niveauId == niveau.id){
                        tableau.push(res[i])
                    }
                }
                setMatieres(tableau)     
            })

            fetch('http://localhost:8000/classes')
            .then(response => { return response.json()})
            .then(res => { 
                var tableau = [];
                for(var i=0; i<res.length; i++){
                    if(res[i].niveauId == niveau.id){
                        tableau.push(res[i])
                    }
                }
                setClasses(tableau)      
            })
        }
    },[niveau])

    const handleType = (type) => {
        if (type.target.value !== undefined){
            if(type.target.value == ''){
                setTypeIsValid('form-control is-invalid')
            }
            else if(type.target.value.length < 3){
                setTypeIsValid('form-control is-invalid')
            }

            else if(type.target.value.length > 20){
                setTypeIsValid('form-control is-invalid')
            }else{
                setTypeIsValid('form-control is-valid')
                setType(type.target.value);
            }
            
        }else{
            setTypeIsValid('form-control is-invalid');
        }
    }

    const handleValue = (value) => {
        if(value.target.value !== undefined){
            setValueIsValid('form-control is-valid');
            setValue(value.target.value);
        }
        else{
            setValueIsValid('form-control is-invalid');
            setValue(null)
        }
    }

    const handleFormation = ((formation)=>{
        if(formation.target.value !== undefined){
            const selectedIndex = formation.target.options.selectedIndex;
            const id = formation.target.options[selectedIndex].getAttribute('data-key');
            formations.map((formation)=>{
                if(formation.id == id){
                    setFormation(formation)
                    setFormationIsValid('form-control is-valid');
                }
            })
        }else{
            setFormationIsValid('form-control is-invalid')
        }
    })

    const handleLevel = ((level)=>{
        if(level.target.value !== undefined){
            const selectedIndex = level.target.options.selectedIndex;
            const id = level.target.options[selectedIndex].getAttribute('data-key');
            levels.map((level)=>{
                if(level.id == id){
                    setNiveau(level)
                    setNiveauIsValid('form-control is-valid')
                }
            })
        }else {
            setNiveauIsValid('form-control is-invalid')
        }
    })

    const handleMatiere = (matiere) => {
        if(matiere.target.value !== undefined){
            const selectedIndex = matiere.target.options.selectedIndex;
            const id = matiere.target.options[selectedIndex].getAttribute('data-key');
            matieres.map((matiere)=>{
                if(matiere.id == id){
                    setMatiere(matiere);
                    setMatiereIsValid('form-control is-valid');
                }
            })
        }else{
            setMatiereIsValid('form-control is-invalid');
        }
    }

    const handleClasses = (classe =>{
        if(classe.target.value !== undefined){
            const selectedIndex = classe.target.options.selectedIndex;
            const id = classe.target.options[selectedIndex].getAttribute('data-key');
            classes.map(classe =>{
                if(classe.id == id){
                    setClasse(classe)
                    setClasseIsValid('form-control is-valid')
                }
            })
        }
        else{
            setClasseIsValid('form-control is-invalid')
        }
    })

    const handleEtudiant = (etudiant) => {
        if(etudiant.target.value !== undefined){
            setEtudiantIsValid('form-control is-valid')
            setEtudiant(etudiant.target.value)
        }else{
            setEtudiantIsValid('form-control is-invalid')
        }
    }

    const handleProf = (prof) => {
        if(prof.target.value !== undefined){
            setProfIsValid('form-control is-valid')
            setProf(prof.target.value)
        }else{
            setProfIsValid('form-control is-invalid')
        }
    }
    
    const handleDtPass = (dtPass) => {
        if(dtPass.target.value !== undefined && dtPass.target.value !== ''){
            setDtPassIsValid('form-control is-valid')
            setDtPass(dtPass.target.value)
        }else{
            setDtPassIsValid('form-control is-invalid')
        }
    }

    const handleSubmit = async(grade) => {
        grade.preventDefault();
        if((typeIsValid === 'form-control is-invalid') || (matiereIsValid === 'form-control is-invalid') 
        || (etudiantIsValid === 'form-control is-invalid') 
        || (profIsValid === 'form-control is-invalid') || (dtPassIsValid === 'form-control is-invalid') ){
            
        }
        else{
            let confirm = window.confirm('Do you really want to submit the form?');
            if(confirm === true){
                grade.preventDefault();
                const response = await fetch('http://localhost:8000/note/'+id, {
                method: 'PATCH',
                body: JSON.stringify({
                        type: type,
                        date_passage_examen: dtPass,
                        matiereId : matiere.id
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                const data = await response.json();
                console.log(data);
                alert("Form has been submitted");
                history.push('/grades')
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
                            <h3 className="page-title">Edit Grade</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/grades">Grade</a></li>
                                <li className="breadcrumb-item active">Edit Grade</li>
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

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Grade type</Form.Label>
                                                <Form.Control className={typeIsValid} type="text" onChange={handleType} defaultValue={type} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Value</Form.Label>
                                                <Form.Control className={valueIsValid} type="number" min={0} max={20} defaultValue={value} />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Formation</Form.Label>
                                                <Form.Control className={formationIsValid} as="select" onChange={handleFormation} value={oldFormation && oldFormation.nom}>
                                                    <option>Choose a formation</option>	
                                                    {formations && formationItems}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Level</Form.Label>
                                                <Form.Control className={niveauIsValid} as="select" onChange={handleLevel} value={niveau && niveau.designation}>
                                                    <option>Choose a level</option>	
                                                    {levels && levelItems}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Matiere</Form.Label>
                                                <Form.Control className={matiereIsValid} as="select" onChange={handleMatiere} value={matiere && matiere.designation} >
                                                    <option>Choose a subject</option>	
                                                    {items}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Classe</Form.Label>
                                                <Form.Control className={classeIsValid} as="select" onChange={handleClasses} value={classe && classe.nom}>
                                                    <option>Choose the class</option>	
                                                    {classes && classItems}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Etudiant</Form.Label>
                                                <Form.Control className={etudiantIsValid} as="select" onChange={handleEtudiant} defaultValue= {etudiant} >
                                                    <option>Choisir un etudiant</option>	
                                                    <option>Louay</option>
                                                    <option>Hamza</option>
                                                    <option>Abdou</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>    
                                                <Form.Label>Proffeseur</Form.Label>
                                                <Form.Control className={profIsValid} as="select" onChange={handleProf} defaultValue= {prof} >
                                                    <option>Choisir un prof</option>	
                                                    <option>Achref</option>
                                                    <option>Amine</option>
                                                    <option>Sirine</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Date passage examen</Form.Label>
                                                <Form.Control className={dtPassIsValid} type="date" onChange={handleDtPass} defaultValue={dtPass} />
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
export { EditGrade };