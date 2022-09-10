import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import userService from '../../services/user.service';

import { useHistory } from 'react-router-dom';
import Select from "react-select";
import { allClasses } from '../../slices/classes';
import { useDispatch, useSelector } from 'react-redux';

function EditTeacher() {

    const history = useHistory()
    const dispatch = useDispatch()


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
    const [classe, setClasse] = useState("")
    const [salaire, setSalaire] = useState("")
    const [classPlaceHolder, setclassPlaceHolder] = useState([])

    const classes = useSelector((state) => state.classes.classes)

    useEffect(() => {
        dispatch(allClasses())
        getUser(userId.id)
    }, [])

    useEffect(() => {
        if (firstname === "" || firstname === null || firstname === undefined || firstname.length < 3) {
            setFirstNameClassName("form-control is-invalid")
        }
        else {
            setFirstNameClassName("form-control is-valid")
        }
    }, [firstname])

    useEffect(() => {
        if (isValidNumber(phoneNumber)) {
            setPhoneNumberClass("form-control is-valid")
        } else {
            setPhoneNumberClass("form-control is-invalid")
        }
    }, [phoneNumber])



    useEffect(() => {
        if (classe === "" || classe === null || classe === undefined) {
            setClasseClassName("form-control is-invalid")
        }
        else {
            setClasseClassName("form-control is-valid")
        }
    }, [classe])


    useEffect(() => {
        if (salaire === "" || salaire === null || salaire === undefined) {
            setSalaireClassName("form-control is-invalid")
        }
        else {
            setSalaireClassName("form-control is-valid")
        }
    }, [salaire])

    useEffect(() => {
        if (lastname === "" || lastname === null || lastname === undefined || lastname.length < 3) {
            setLastNameClassName("form-control is-invalid")
        }
        else {
            setLastNameClassName("form-control is-valid")
        }
    }, [lastname])

    useEffect(() => {
        if (birthDate === "" || birthDate === null || birthDate === undefined) {
            setBirthDateClassName("form-control is-invalid")
        }
        else {
            setBirthDateClassName("form-control is-valid")
        }
    }, [birthDate])

    useEffect(() => {
        if (!isValidEmail(email)) {
            setEmailClassName("form-control is-invalid")
        }
        else {
            setEmailClassName("form-control is-valid")
        }
    }, [email])


    useEffect(() => {
        if (!isValidPassword(password)) {
            setPasswordClassName("form-control is-invalid")
        }
        else {
            setPasswordClassName("form-control is-valid")
        }
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
        setClasse(e.value)
    }

    const handleSalaireChange = (e) => {
        setSalaire(e.target.value)
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
        let specificData = JSON.parse(JSON.parse(user.data.specificData))
        console.log(user.data)
        setFirstName(user.data.firstname)
        setLastName(user.data.lastname)
        setEmail(user.data.email)
        setPassword(user.data.password)
        setBirthDate(user.data.birthDate)
        setPhoneNumber(user.data.phoneNumber)
        setSalaire(specificData.salary)
        setClasse(specificData.classesId)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        userService.editUser(userId.id, firstname, lastname, email, password, birthDate, phoneNumber, salaire)

        setTimeout(() => {
            history.push('/teachers')
        }, 1200);
    }

    const handleSalaryUpdate = (e) => {
        e.preventDefault()
        userService.updateSalary(userId.id, salaire)
        setTimeout(() => {
            history.push('/teachers')
        }, 1200);
    }

    const handleAddClass = (e) => {
        e.preventDefault()
        userService.addClass(userId.id, classe)
        setTimeout(() => {
            history.push('/teachers')
        }, 1200);
    }

    const handleRemoveClass = (e) => {
        e.preventDefault()
        userService.removeClass(userId.id, classe)
        setTimeout(() => {
            history.push('/teachers')
        }, 1200);
    }

    const classesSelectList = classes.map((c) => {
        return { value: c.id, label: c.designation }
    })

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
                                            <Form.Control type="text" className={passwordClassName} onChange={handlePasswordChange} required />
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
                <Col sm={12}>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col sm={12}>
                                        <h5 className="form-title"><span>Add Classes</span></h5>
                                    </Col>

                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Select
                                                placeholder="Select a subject ..."
                                                options={classesSelectList}
                                                onChange={handleClasseChange}
                                                isSearchable={true}
                                            />
                                            {/*                                             <Form.Control type="text" className={classeClassName} defaultValue={classe} onChange={handleClasseChange} required />
 */}                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Button variant="primary" type="submit" onClick={handleAddClass}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12}>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col sm={12}>
                                        <h5 className="form-title"><span>Remove Classe</span></h5>
                                    </Col>

                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Select
                                                placeholder="Select a Class ..."
                                                options={classesSelectList}
                                                onChange={handleClasseChange}
                                                isSearchable={true}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Button variant="primary" type="submit" onClick={handleRemoveClass}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12}>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col sm={12}>
                                        <h5 className="form-title"><span>Salary</span></h5>
                                    </Col>

                                    <Col xs={12} sm={6}>
                                        <Form.Group>
                                            <Form.Label>Salaire</Form.Label>
                                            <Form.Control type="text" className={salaireClassName} defaultValue={salaire} onChange={handleSalaireChange} required />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Button variant="primary" type="submit" onClick={handleSalaryUpdate}>
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