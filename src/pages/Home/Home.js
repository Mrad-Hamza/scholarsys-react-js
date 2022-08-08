import React,{useState,useEffect} from 'react'
import { Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux/es/exports';

function Home() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [userRole, setUserRole] = useState("")


    useEffect(() => {
        switch (currentUser.role) {
            case "1":
                setUserRole("Student")
                break;
            case "666":
                setUserRole("Teacher")
                break;
            case "987":
                setUserRole("Agent")
                break;
            default:
                break;
        }
    }, [])


    return (
        <div className="main-wrapper login-body">
            <div className="page-header">
                <Row>
                    <Col sm={12}>
                        <h3 className="page-title">Preskol Home Page !</h3>
                        <ul className="breadcrumb">
                        </ul>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col sm={12} className="mb-5">
                    Welcome {currentUser.firstname} to our school management website.
                    <br/>
                    <br/>
                    Your are logged in as a {userRole}.
                </Col>
            </Row>
        </div>
    )
}

export default Home