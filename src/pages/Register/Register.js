import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

// Import Logo
import Logo from '../../assets/img/logo-white.png';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

// import toast
import toast, { Toaster } from 'react-hot-toast';

// import service
import userService from '../../services/user.service'

// import navigate
import { useHistory } from 'react-router-dom';
import { register } from "../../slices/auth";
import { clearMessage } from "../../slices/message";


function Register() {
	const [nameClass, setNameClass] = useState("form-control is-invalid")
	const [name, setName] = useState("")
	const [emailClass, setEmailClass] = useState("form-control is-invalid")
	const [email, setEmail] = useState("")
	const [passwordClass, setPasswordClass] = useState("form-control is-invalid")
	const [password, setPassword] = useState("")
	const [confirmPasswordClass, setConfirmPasswordClass] = useState("form-control is-invalid")
	const [confirmPassword, setConfirmPassword] = useState("")
	const history = useHistory()
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(clearMessage());
	}, [dispatch]);

	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const register = async (e) => {
		e.preventDefault();
		if (nameClass === "form-control is-invalid" || emailClass === "form-control is-invalid" || passwordClass === 'form-control is-invalid' || confirmPasswordClass === "form-control is-invalid") {
			toast.error("There is an error. Please re-enter your information")
		} else {
			toast.success("Success. Please Check your e-mail to confirm your registration")
			userService.register(email, password, name)
			history.push('/login')
			window.location.reload(true)
		}
	}

	useEffect(() => {
		if (name.length >= 3) {
			setNameClass("form-control is-valid")
		} else {
			setNameClass("form-control is-invalid")
		}
	}, [name])

	useEffect(() => {
		if (isValidEmail(email)) {
			setEmailClass("form-control is-valid")
		}
		else {
			setEmailClass("form-control is-invalid")
		}
	}, [email])

	useEffect(() => {
		console.log(password)
		if (isValidPassword(password) && password.length>8) {
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

	function isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	}

	function isValidPassword(password) {
		return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
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
								<h1>Register</h1>
								<p className="account-subtitle">Access to our dashboard</p>

								<form onSubmit={register}>
									<div className="form-group">
										<input class={nameClass} type="text" placeholder="Name" value={name} onChange={handleNameChange} required />
									</div>
									<div className="form-group">
										<input class={emailClass} type="text" placeholder="Email" value={email} onChange={handleEmailChange} required />
									</div>
									<div className="form-group">
										<input class={passwordClass} type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
										<div class="invalid-feedback">
											Password must have at least 8 characters, a number, a symbol, an upper and lower case letter.
										</div>
									</div>
									<div className="form-group">
										<input class={confirmPasswordClass} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
										<div class="invalid-feedback">
											Passwords must be identical.
										</div>
									</div>
									<div className="form-group mb-0">
										<button className="btn btn-primary btn-block" type='submit'>
											Register
										</button>
									</div>
								</form>

								{/* <div className="login-or">
									<span className="or-line"></span>
									<span className="span-or">or</span>
								</div> */}


								{/* <div className="social-login">
									<span>Register with</span>
									<a href="#" className="facebook"><FontAwesomeIcon icon={faFacebookF} /></a><a href="#" className="google"><FontAwesomeIcon icon={faGoogle} /></a>
								</div> */}


								<div className="text-center dont-have">Already have an account? <a href="/login">Login</a></div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register