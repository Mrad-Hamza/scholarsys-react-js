import React, { useState, useEffect } from 'react'

import Logo from '../../assets/img/logo-white.png';

import { useHistory } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import authService from '../../services/auth.service';

import toast, { Toaster } from 'react-hot-toast';



function ResetPassword() {

    const history = useHistory()
    const refreshToken = useParams()

    const [passwordClass, setPasswordClass] = useState("form-control is-invalid")
    const [password, setPassword] = useState("")

    const [confirmPasswordClass, setConfirmPasswordClass] = useState("form-control is-invalid")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        console.log(refreshToken.refreshToken)
    }, [])


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    useEffect(() => {
        console.log(password)
        if (isValidPassword(password) && password.length > 8) {
            setPasswordClass("form-control is-valid")
        } else {
            setPasswordClass("form-control is-invalid")
        }
    }, [password])

    useEffect(() => {
        console.log(confirmPassword)
        if (confirmPassword === password && password.length > 8) {
            setConfirmPasswordClass("form-control is-valid")
        } else {
            setConfirmPasswordClass("form-control is-invalid")
        }
    }, [confirmPassword])

    function isValidPassword(password) {
        return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
    }

    const recoverPassword = (e) => {
        e.preventDefault()
        if (passwordClass === "form-control is-invalid" || confirmPasswordClass==='form-control is-invalid') {
            toast.error("There is an error. Please re-enter your information")
        }
        else {
            authService.resetPassword(refreshToken.refreshToken, password, confirmPassword)
            toast.success("Success. Please Check your e-mail to confirm your registration")
            setTimeout(() => {
                history.push('/login')
            }, 3000);
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
                                <h1>Forgot Password?</h1>


                                <form>

                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type="password" class={passwordClass} onChange={handlePasswordChange} value={password} required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password" class={confirmPasswordClass} onChange={handleConfirmPasswordChange} value={confirmPassword} required />
                                    </div>

                                    <div className="form-group mb-0">
                                        <button className="btn btn-primary btn-block" onClick={recoverPassword}>Reset Password</button>
                                    </div>
                                </form>


                                <div className="text-center dont-have">Remember your password? <button style={{ outline: "none", border: "none" }} onClick={() => history.push('/login')}>Login</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   </div>

    )
}

export default ResetPassword