import React from 'react';
// Import Components
import { Row, Col } from "react-bootstrap";

class FormInputGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div>
                <div className="page-header">
                    <Row>
                        <Col sm={12}>
                            <h3 className="page-title">Input Groups</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active">Input Groups</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <div className="row">
					<div className="col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header">
								<h5 className="card-title">Basic Form</h5>
							</div>
							<div className="card-body">
								<form action="#">
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">First Name</label>
										<div className="col-lg-9">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">Last Name</label>
										<div className="col-lg-9">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">Email Address</label>
										<div className="col-lg-9">
											<input type="email" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">Username</label>
										<div className="col-lg-9">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">Password</label>
										<div className="col-lg-9">
											<input type="password" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">Repeat Password</label>
										<div className="col-lg-9">
											<input type="password" className="form-control" />
										</div>
									</div>
									<div className="text-end">
										<button type="submit" className="btn btn-primary">Submit</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header">
								<h5 className="card-title">Address Form</h5>
							</div>
							<div className="card-body">
								<form action="#">
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">Address 1</label>
										<div className="col-lg-9">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">Address 2</label>
										<div className="col-lg-9">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">City</label>
										<div className="col-lg-9">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">State</label>
										<div className="col-lg-9">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">Country</label>
										<div className="col-lg-9">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-3 col-form-label">Postal Code</label>
										<div className="col-lg-9">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="text-end">
										<button type="submit" className="btn btn-primary">Submit</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header">
								<h5 className="card-title">Two Column Horizontal Form</h5>
							</div>
							<div className="card-body">
								<h5 className="card-title">Personal Information</h5>
								<form action="#">
									<div className="row">
										<div className="col-xl-6">
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">First Name</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Last Name</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Gender</label>
												<div className="col-lg-9">
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="radio" name="gender" id="gender_male" value="option1" defaultChecked />
														<label className="form-check-label" htmlFor="gender_male">
														Male
														</label>
													</div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="radio" name="gender" id="gender_female" value="option2" />
														<label className="form-check-label" htmlFor="gender_female">
														Female
														</label>
													</div>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Blood Group</label>
												<div className="col-lg-9">
													<select className="form-control">
														<option>Select</option>
														<option value="1">A+</option>
														<option value="2">O+</option>
														<option value="3">B+</option>
														<option value="4">AB+</option>
													</select>
												</div>
											</div>
										</div>
										<div className="col-xl-6">
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Username</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Email</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Password</label>
												<div className="col-lg-9">
													<input type="password" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Repeat Password</label>
												<div className="col-lg-9">
													<input type="password" className="form-control" />
												</div>
											</div>
										</div>
									</div>
									<h5 className="card-title">Address</h5>
									<div className="row">
										<div className="col-xl-6">
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Address Line 1</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Address Line 2</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">State</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
										</div>
										<div className="col-xl-6">
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">City</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Country</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Postal Code</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
										</div>
									</div>
									<div className="text-end">
										<button type="submit" className="btn btn-primary">Submit</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header">
								<h5 className="card-title">Two Column Horizontal Form</h5>
							</div>
							<div className="card-body">
								<form action="#">
									<div className="row">
										<div className="col-xl-6">
											<h5 className="card-title">Personal Details</h5>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">First Name</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Last Name</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Password</label>
												<div className="col-lg-9">
													<input type="password" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">State</label>
												<div className="col-lg-9">
													<select className="form-control">
														<option>Select State</option>
														<option value="1">California</option>
														<option value="2">Texas</option>
														<option value="3">Florida</option>
													</select>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">About</label>
												<div className="col-lg-9">
													<textarea rows="4" cols="5" className="form-control" placeholder="Enter message"></textarea>
												</div>
											</div>
										</div>
										<div className="col-xl-6">
											<h5 className="card-title">Personal details</h5>
											<div className="row">
												<label className="col-lg-3 col-form-label">Name</label>
												<div className="col-lg-9">
													<div className="row">
														<div className="col-md-6">
															<div className="form-group">
																<input type="text" placeholder="First Name" className="form-control" />
															</div>
														</div>
														<div className="col-md-6">
															<div className="form-group">
																<input type="text" placeholder="Last Name" className="form-control" />
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Email</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Phone</label>
												<div className="col-lg-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-lg-3 col-form-label">Address</label>
												<div className="col-lg-9">
													<input type="text" className="form-control m-b-20" />
													<div className="row">
														<div className="col-md-6">
															<div className="form-group">
																<select className="form-control">
																	<option>Select Country</option>
																	<option value="1">USA</option>
																	<option value="2">France</option>
																	<option value="3">India</option>
																	<option value="4">Spain</option>
																</select>
															</div>
															<div className="form-group">
																<input type="text" placeholder="ZIP code" className="form-control" />
															</div>
														</div>
														<div className="col-md-6">
															<div className="form-group">
																<input type="text" placeholder="State/Province" className="form-control" />
															</div>
															<div className="form-group">
																<input type="text" placeholder="City" className="form-control" />
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="text-end">
										<button type="submit" className="btn btn-primary">Submit</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
            </div>
        )
    }
}
export { FormInputGroups };