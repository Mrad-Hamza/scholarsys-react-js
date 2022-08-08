import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Logo from '../../assets/img/logo-white.png';
import { useHistory } from 'react-router-dom';

import { Button } from "react-bootstrap";



function ConfirmAccount() {

    const history = useHistory()
    const [buttonValue, setButtonValue] = useState("Confirming ...")
    const [spanClassName, setSpanClassName] = useState("spinner-border spinner-border-sm me-2")

    useEffect(() => {
      
        setTimeout(() => {
            setButtonValue("Confirmed !")
            setSpanClassName("")
        }, 2000);

    }, [])

    const handleButton = (e) => {
        e.preventDefault()
        if (buttonValue === "Confirmed !") {
            history.push('/login')
        }
    }
    

    return (
        <div className="main-wrapper login-body">
            <Toaster position="top-right"
                reverseOrder={false} />
            <div className="login-wrapper">
                <div className="container">
                    <div className="loginbox">
                        <div className="login-left">
                            <img className="img-fluid" src={Logo} alt="Logo" />
                        </div>

                        <div className="login-right">
                            <div className="login-right-wrap">
                                <Button variant="success" className="me-1" onClick={handleButton}><span className={spanClassName} role="status"></span>{buttonValue}</Button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>   </div>
    )
}

export default ConfirmAccount