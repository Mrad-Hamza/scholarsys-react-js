import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import userService from '../../services/user.service';

import { useHistory } from 'react-router-dom';


function EditTeacher() {

    const history = useHistory()

    const [firstNameClassName, setFirstNameClassName] = useState("form-control is-invalid")
    const [lastNameClassName, setLastNameClassName] = useState("form-control is-invalid")
    const [birthDateClassName, setBirthDateClassName] = useState("form-control is-invalid")
    const [emailClassName, setEmailClassName] = useState("form-control is-invalid")
    const [passwordClassName, setPasswordClassName] = useState("form-control is-invalid")
    const [niveauClassName, setNiveauClassName] = useState("form-control is-invalid")
    const [classeClassName, setClasseClassName] = useState("form-control is-invalid")
    const [salaireClassName, setSalaireClassName] = useState("form-control is-invalid")
    const [matiereClassName, setMatiereClassName] = useState("form-control is-invalid")
    const [phoneNumberClass, setPhoneNumberClass] = useState("form-control is-invalid")


    const userId = useParams()

    const [phoneNumber, setPhoneNumber] = useState(0)
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthDate, setBirthDate] = useState(Date())
    const [niveau, setNiveau] = useState("")
    const [classe, setClasse] = useState("")
    const [salaire, setSalaire] = useState("")
    const [matiere, setMatiere] = useState("")

    useEffect(() => {
        console.log( userId)
        getUser(userId.id)
    }, [])

    useEffect(() => {
        if (firstname === "" || firstname === null || firstname === undefined || firstname.length < 3) {
            setFirstNameClassName("form-control is-invalid")
        }
        else {
            setFirstNameClassName("form-control is-valid")
        }
        console.log(firstname)
    }, [firstname])

    useEffect(() => {
        if (isValidNumber(phoneNumber)) {
            setPhoneNumberClass("form-control is-valid")
        } else {
            setPhoneNumberClass("form-control is-invalid")
        }
        console.log(phoneNumber)
    }, [phoneNumber])

    useEffect(() => {
        if (niveau === "" || niveau === null || niveau === undefined) {
            setNiveauClassName("form-control is-invalid")
        }
        else {
            setNiveauClassName("form-control is-valid")
        }
        console.log(niveau)
    }, [niveau])

    useEffect(() => {
        if (classe === "" || classe === null || classe === undefined) {
            setClasseClassName("form-control is-invalid")
        }
        else {
            setClasseClassName("form-control is-valid")
        }
        console.log(classe)
    }, [classe])

    useEffect(() => {
        if (matiere === "" || matiere === null || matiere === undefined) {
            setMatiereClassName("form-control is-invalid")
        }
        else {
            setMatiereClassName("form-control is-valid")
        }
        console.log(matiere)
    }, [matiere])

    useEffect(() => {
        if (salaire === "" || salaire === null || salaire === undefined) {
            setSalaireClassName("form-control is-invalid")
        }
        else {
            setSalaireClassName("form-control is-valid")
        }
        console.log(salaire)
    }, [salaire])

    useEffect(() => {
        if (lastname === "" || lastname === null || lastname === undefined || lastname.length < 3) {
            setLastNameClassName("form-control is-invalid")
        }
        else {
            setLastNameClassName("form-control is-valid")
        }
        console.log(lastname)
    }, [lastname])

    useEffect(() => {
        if (birthDate === "" || birthDate === null || birthDate === undefined) {
            setBirthDateClassName("form-control is-invalid")
        }
        else {
            setBirthDateClassName("form-control is-valid")
        }
        console.log(birthDate)
    }, [birthDate])

    useEffect(() => {
        if (!isValidEmail(email)) {
            setEmailClassName("form-control is-invalid")
        }
        else {
            setEmailClassName("form-control is-valid")
        }
        console.log(email)
    }, [email])


    useEffect(() => {
        if (!isValidPassword(password)) {
            setPasswordClassName("form-control is-invalid")
        }
        else {
            setPasswordClassName("form-control is-valid")
        }
        console.log(password)
    }, [password])

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value)
    }

    const handlephoneNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleClasseChange = (e) => {
        setClasse(e.target.value)
    }

    const handleNiveauChange = (e) => {
        setNiveau(e.target.value)
    }

    const handleSalaireChange = (e) => {
        setSalaire(e.target.value)
    }

    const handleMatiereChange = (e) => {
        setMatiere(e.target.value)
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function isValidPassword(password) {
        return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
    }


    function isValidNumber(number) {
        return /^[0-9]{8}$/.test(number)
    }

    async function getUser(id) {
        let user = await userService.getUser(id)
        setFirstName(user.data.firstname)
        setLastName(user.data.lastname)
        setEmail(user.data.email)
        setPassword(user.data.password)
        setBirthDate(user.data.birthDate)
        setPhoneNumber(user.data.phoneNumber)
        setSalaire(user.data.salaire)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        userService.editUser(userId.id, firstname, lastname, email, password, birthDate, phoneNumber, salaire)
        setTimeout(() => {
            history.push('/teachers')
        }, 1200);
    }

    return (
        <div>
            <div className="page-header">
                <Row>
                    <Col sm={12}>
                        <h3 className="page-title">Edit Teacher</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="">Teachers</a></li>
                            <li className="breadcrumb-item active">Edit Teachers</li>
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
                                        <h5 className="form-title"><span>Teacher Information</span></h5>
                                    </Col>

                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" className={firstNameClassName} defaultValue={firstname} onChange={handleFirstNameChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" className={lastNameClassName} defaultValue={lastname} onChange={handleLastNameChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>User Id</Form.Label>
                                            <Form.Control disabled type="text" defaultValue={userId.id} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Date of Birth</Form.Label>
                                            <Form.Control type="date" className={birthDateClassName} defaultValue={birthDate} onChange={handleBirthDateChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="number" className={phoneNumberClass} value={phoneNumber} onChange={handlephoneNumberChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="text" className={emailClassName} defaultValue={email} onChange={handleEmailChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="text" className={passwordClassName} defaultValue={password} onChange={handlePasswordChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Niveau</Form.Label>
                                            <Form.Control type="text" className={niveauClassName} defaultValue={niveau} onChange={handleNiveauChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Classe</Form.Label>
                                            <Form.Control type="text" className={classeClassName} defaultValue={classe} onChange={handleClasseChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Matiere</Form.Label>
                                            <Form.Control type="text" className={matiereClassName} defaultValue={matiere} onChange={handleMatiereChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Salaire</Form.Label>
                                            <Form.Control type="text" className={salaireClassName} defaultValue={salaire} onChange={handleSalaireChange} required />
                                        </Form.Group>
                                    </Col>
                                    {/* <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Teacher Image</Form.Label>
                                            <Form.File className="form-control" />
                                        </Form.Group>
                                    </Col> */}
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

export default EditTeacher