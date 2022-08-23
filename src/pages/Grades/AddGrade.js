import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { allStudents, allTeachers } from '../../slices/users';
import toast, { Toaster } from 'react-hot-toast';
import Select from "react-select";

function AddGrade () {
    
    let history = useHistory();
    const dispatch = useDispatch();

    const [matieres,setMatieres] = useState([]);
    const [levels,setLevels] = useState([]);
    const [formations, setFormations] = useState([]);
    const [classes, setClasses] = useState([]);
    const teachers = useSelector((state) => state.users.teachers);
    const students = useSelector((state) => state.users.students)

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

    const subjectItems = matieres.map((matiere)=>{
        return(
            <option key={matiere.id} data-key={matiere.id}>{matiere.designation}</option>
        )
    })

    /*const studentsItems = students.map((student)=>{
        return(
            <option key={'student'+student.id} data-key={student.id}>{student.firstname}</option>
        )
    })

    const teachersItems = teachers.map((teacher)=>{
        return(
            <option key={'teacher'+teacher.id} data-key={teacher.id}>{teacher.firstname}</option>
        )
    })*/

    useEffect(() => {
        fetch('http://localhost:8000/formations')
        .then(response => { return response.json()})
        .then(formation => { setFormations(formation) })

    },[]);  

    useEffect(() => {
        dispatch(allStudents())
        dispatch(allTeachers())
    }, [])

    const [type, setType] = useState();
    const [typeIsValid, setTypeIsValid] = useState('form-control is-invalid');

    const [value, setValue] = useState();
    const [valueIsValid, setValueIsValid] = useState('form-control is-invalid')

    const [formation, setFormation] = useState();
    const [formationIsValid, setFormationIsValid] = useState('form-control is-invalid');
 
    const [niveau, setNiveau] = useState('');
    const[niveauIsValid, setNiveauIsValid] = useState('form-control is-invalid');

    const [matiere, setMatiere] = useState();
    const [matiereIsValid, setMatiereIsValid] = useState('form-control is-invalid');

    const [classe, setClasse] = useState();
    const [classIsValid, setClassIsValid] = useState('form-control is-invalid');

    const [etudiant, setEtudiant] = useState();
    const [etudiantIsValid, setEtudiantIsValid] = useState('form-control is-invalid');

    const [prof, setProf] = useState();
    const [profIsValid, setProfIsValid] = useState('form-control is-invalid');
    
    const [dtPass, setDtPass] = useState();
    const [dtPassIsValid, setDtPassIsValid] = useState('form-control is-invalid');

    useEffect(()=>{
        setLevels([])
        setMatieres([])
        setClasses([])
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

    useEffect(()=>{

    },[students])


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
        if(value.target.value !== undefined && value.target.value !== ''){
            if(value.target.value.match(/^(\d*\.{0,1}\d{0,3}$)/)){
                if(Number.parseFloat(value.target.value) > 20 || Number.parseFloat(value.target.value) < 0 ){
                    setValueIsValid('form-control is-invalid');
                }else{
                    setValueIsValid('form-control is-valid');
                    setValue(value.target.value);
                }
            }else{
                setValueIsValid('form-control is-invalid');
            }
        }
        else{
            setValueIsValid('form-control is-invalid');
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
                    setClassIsValid('form-control is-valid')
                }
            })
        }
        else{
            setClassIsValid('form-control is-invalid')
        }
    })

    const handleEtudiant = (etudiant) => {
        if(etudiant !== undefined){
            setEtudiantIsValid('form-control is-valid')
            setEtudiant(etudiant)
        }else{
            setEtudiantIsValid('form-control is-invalid')
        }
    }

    const handleProf = (prof) => {
        if(prof !== undefined){
            setProfIsValid('form-control is-valid')
            setProf(prof)
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

    const handleSubmit = async (grade) => {
        grade.preventDefault();
        if((typeIsValid === 'form-control is-invalid') || (valueIsValid === 'form-control is-invalid') ||
         (matiereIsValid === 'form-control is-invalid') || (etudiantIsValid === 'form-control is-invalid') 
        || (profIsValid === 'form-control is-invalid') || (dtPassIsValid === 'form-control is-invalid') ){
            toast.error('Form contains errors');
        }
        else{
            toast.success('Form has been submitted')
                grade.preventDefault();
                console.log(matiere)
                    const response = await fetch('http://localhost:8000/createNote', {
                    method: 'POST',
                    body: JSON.stringify({
                            type: type,
                            date_passage_examen: dtPass,
                            matiereId: matiere.id,
                            coef_Note: matiere.coef,
                            note_val: value,
                            teacherId: prof.value,
                            studentId: etudiant.value
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    });
                    const data = await response.json();
                    console.log(data);
                history.push('grades')
        }
    }

    useEffect(()=>{

    },[students,teachers])

    const studentList = students.map((student)=>{
        return {value: student.id, label: student.firstname +' '+ student.lastname}
    });

    const teachersList = teachers.map(teacher =>{
        return {value: teacher.id, label: teacher.firstname +' ' + teacher.lastname}
    })
    
        return (
            <div>
                <Toaster position="top-right"
				reverseOrder={false} />
			    <div className="login-wrapper"></div>
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

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Grade type</Form.Label>
                                                <Form.Control className={typeIsValid} type="text" onChange={handleType}/>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Value</Form.Label>
                                                <Form.Control className={valueIsValid} onChange={handleValue} type="number" min={0} max={20}/>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Formation</Form.Label>
                                                <Form.Control className={formationIsValid} as="select" onChange={handleFormation}>
                                                    <option>Choose a formation</option>	
                                                    {formations && formationItems}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Level</Form.Label>
                                                <Form.Control className={niveauIsValid} as="select" onChange={handleLevel}>
                                                    <option>Choose a level</option>	
                                                    {levels && levelItems}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={12}>
                                            <Form.Group>
                                                <Form.Label>Subject</Form.Label>
                                                <Form.Control className={matiereIsValid} as="select" onChange={handleMatiere}>
                                                    <option>Choose a subject</option>	
                                                    {matieres && subjectItems}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Classe</Form.Label>
                                                <Form.Control className={classIsValid} as="select" onChange={handleClasses}>
                                                    <option>Choose the class</option>	
                                                    {classes && classItems}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Etudiant</Form.Label>
                                                    <Select
                                                        options={studentList}
                                                        value={etudiant}
                                                        onChange={handleEtudiant}
                                                        isSearchable={true}
                                                        //className={etudiantIsValid}
                                                        />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>    
                                                <Form.Label>Proffeseur</Form.Label>
                                                <Select
                                                    options={teachersList}
                                                    value={prof}
                                                    onChange={handleProf}
                                                    isSearchable={true}
                                                    //className={profIsValid}
                                                    />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} sm={6}>
                                            <Form.Group>
                                                <Form.Label>Date passage examen</Form.Label>
                                                <Form.Control className={dtPassIsValid} type="date" onChange={handleDtPass}/>
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