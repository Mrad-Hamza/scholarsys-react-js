import React from 'react';
// Import Components
import { Row, Col, Card, Table } from "react-bootstrap";
// Import Chart
import { Line, Bar } from 'react-chartjs-2';
// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCrown, faFileAlt, faUserGraduate } from '@fortawesome/fontawesome-free-solid';
import { faFacebook, faInstagram, faLinkedin, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';

// Revenue Chart
const data = {
    labels: ['Jan', 'Feb', 'Mar','Apr','May','Jun', 'Jul'],
    datasets: [
        {
            label: 'Sales',
            backgroundColor: 'rgb(25 175 251 / 20%)',
            borderColor: '#19affb',
            borderWidth: 3,
            hoverBackgroundColor: '#19affb',
            hoverBorderColor: '#19affb',
            data: [49, 22, 23,65,43,21,56,57]
        },
        {
            label: 'Expense',
            backgroundColor: 'rgb(253 187 56 / 20%)',
            borderColor: '#fdbb38',
            borderWidth: 3,
            hoverBackgroundColor: '#fdbb38',
            hoverBorderColor: '#fdbb38',
            data: [43,21,56,57,70,23,43,21]
        }
    ]
};

// Student Chart
const dataBar = {
    labels: ['2010', '2011', '2012','2013','2014','2015', '2016'],
    datasets: [
        {
            label: 'Boys',
            backgroundColor: '#19affb',
            hoverBackgroundColor: '#19affb',
            hoverBorderColor: '#19affb',
            data: [497, 452, 273, 635, 483, 621, 556]
        },
        {
            label: 'Girls',
            backgroundColor: '#fdbb38',
            hoverBackgroundColor: '#fdbb38',
            hoverBorderColor: '#fdbb38',
            data: [443, 351, 526, 537, 750, 453, 643, 721]
        }
    ]
};

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <Row>
                        <Col sm={12}>
                            <h3 className="page-title">Welcome Admin!</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                {/* Overview Section */}
                <Row>
                    <Col xl={3} sm={6} >
                        <Card className="bg-one">
                            <Card.Body>
                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                    <div className="db-icon">
                                        <FontAwesomeIcon icon={faUserGraduate} />
                                    </div>
                                    <div className="db-info">
                                        <h3>50055</h3>
                                        <h6>Students</h6>
                                    </div>										
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col xl={3} sm={6} >
                        <Card className="bg-two">
                            <Card.Body>
                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                    <div className="db-icon">
                                        <FontAwesomeIcon icon={faCrown} />
                                    </div>
                                    <div className="db-info">
                                        <h3>50+</h3>
                                        <h6>Awards</h6>
                                    </div>										
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={3} sm={6} >
                        <Card className="bg-three">
                            <Card.Body>
                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                    <div className="db-icon">
                                        <FontAwesomeIcon icon={faBuilding} />
                                    </div>
                                    <div className="db-info">
                                        <h3>30+</h3>
                                        <h6>Department</h6>
                                    </div>										
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={3} sm={6} >
                        <Card className="bg-four">
                            <Card.Body>
                                <div className="db-widgets d-flex justify-content-between align-items-center">
                                    <div className="db-icon">
                                        <FontAwesomeIcon icon={faFileAlt} />
                                    </div>
                                    <div className="db-info">
                                        <h3>$505</h3>
                                        <h6>Revenue</h6>
                                    </div>										
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* /Overview Section */}

                <Row>
                    {/* Revenue Chart */}
                    <Col md={12} lg={6}>
                        <Card className="card-chart">
                            <Card.Header>
                                <Row className="align-items-center">
                                    <Col>
                                        <h5 className="card-title">Revenue</h5>
                                    </Col>
                                    <Col>
                                        <ul className="list-inline-group text-end mb-0 pl-0">
                                            <li className="list-inline-item">
                                                    <div className="form-group mb-0 amount-spent-select">
                                                    <select className="form-control form-control-sm">
                                                        <option>Today</option>
                                                        <option>Last Week</option>
                                                        <option>Last Month</option>
                                                    </select>
                                                </div>
                                            </li>
                                        </ul>                                        
                                    </Col>
                                </Row>
                            </Card.Header>

                            <Card.Body>
                                <Line data={data} />
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* /Revenue Chart */}

                    {/* Student Chart */}
                    <Col md={12} lg={6}>
                        <Card className="card-chart">
                            <Card.Header>
                                <Row className="align-items-center">
                                    <Col>
                                        <h5 className="card-title">Number of Students</h5>
                                    </Col>
                                    <Col>
                                        <ul className="list-inline-group text-end mb-0 pl-0">
                                            <li className="list-inline-item">
                                                    <div className="form-group mb-0 amount-spent-select">
                                                    <select className="form-control form-control-sm">
                                                        <option>Today</option>
                                                        <option>Last Week</option>
                                                        <option>Last Month</option>
                                                    </select>
                                                </div>
                                            </li>
                                        </ul>                                        
                                    </Col>
                                </Row>
                            </Card.Header>

                            <Card.Body>
                                <Bar 
                                    data={dataBar}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* /Student Chart */}                    
                </Row>

                <Row>
                    {/* Star Students */}
                    <Col md={6} className="d-flex">
                        <Card className="flex-fill">
                            <Card.Header>
                                <h5 className="card-title">Star Students</h5>
                            </Card.Header>

                            <Card.Body>
                                <div className="table-responsive">
                                    <Table className="table table-hover table-center">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th className="text-center">Marks</th>
                                                <th className="text-center">Percentage</th>
                                                <th className="text-end">Year</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-nowrap">
                                                    <div>PRE2209</div>
                                                </td>
                                                <td className="text-nowrap">John Smith</td>
                                                <td className="text-center">1185</td>
                                                <td className="text-center">98%</td>
                                                <td className="text-end">
                                                    <div>2019</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-nowrap">
                                                    <div>PRE1245</div>
                                                </td>
                                                <td className="text-nowrap">Jolie Hoskins</td>
                                                <td className="text-center">1195</td>
                                                <td className="text-center">99.5%</td>
                                                <td className="text-end">
                                                    <div>2018</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-nowrap">
                                                    <div>PRE1625</div>
                                                </td>
                                                <td className="text-nowrap">Pennington Joy</td>
                                                <td className="text-center">1196</td>
                                                <td className="text-center">99.6%</td>
                                                <td className="text-end">
                                                    <div>2017</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-nowrap">
                                                    <div>PRE2516</div>
                                                </td>
                                                <td className="text-nowrap">Millie Marsden</td>
                                                <td className="text-center">1187</td>
                                                <td className="text-center">98.2%</td>
                                                <td className="text-end">
                                                    <div>2016</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-nowrap">
                                                    <div>PRE2209</div>
                                                </td>
                                                <td className="text-nowrap">John Smith</td>
                                                <td className="text-center">1185</td>
                                                <td className="text-center">98%</td>
                                                <td className="text-end">
                                                    <div>2015</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* /Star Students */}

                    {/* Feed Activity */}
                    <Col md={6} className="d-flex">
                        <Card className="flex-fill">
                            <Card.Header>
                                <h5 className="card-title">Student Activity</h5>
                            </Card.Header>

                            <Card.Body>
                                <ul className="activity-feed">
                                    <li className="feed-item">
                                        <div className="feed-date">Apr 13</div>
                                        <span className="feed-text"><a>John Doe</a> won 1st place in <a>"Chess"</a></span>
                                    </li>
                                    <li className="feed-item">
                                        <div className="feed-date">Mar 21</div>
                                        <span className="feed-text"><a>Justin Lee</a> participated in <a href="invoice.html">"Carrom"</a></span>
                                    </li>
                                    <li className="feed-item">
                                        <div className="feed-date">Feb 2</div>
                                        <span className="feed-text"><a>Justin Lee</a>attended internation conference in <a href="profile.html">"St.John School"</a></span>
                                    </li>
                                    <li className="feed-item">
                                        <div className="feed-date">Apr 13</div>
                                        <span className="feed-text"><a>John Doe</a> won 1st place in <a>"Chess"</a></span>
                                    </li>
                                    <li className="feed-item">
                                        <div className="feed-date">Mar 21</div>
                                        <span className="feed-text"><a>Justin Lee</a> participated in <a href="invoice.html">"Carrom"</a></span>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* /Feed Activity */}
                </Row>

                {/* Socail Media Follows */}
                <Row>
                    <Col xl={3} sm={6} xs={12}>
                        <Card className="flex-fill fb sm-box">
                            <FontAwesomeIcon icon={faFacebook} />
                            <h6>50,095</h6>
                            <p>Likes</p>
                        </Card>
                    </Col>

                    <Col xl={3} sm={6} xs={12}>
                        <Card className="flex-fill twitter sm-box">
                            <FontAwesomeIcon icon={faTwitter} />
                            <h6>48,596</h6>
                            <p>Follows</p>
                        </Card>
                    </Col>

                    <Col xl={3} sm={6} xs={12}>
                        <Card className="flex-fill insta sm-box">
                            <FontAwesomeIcon icon={faInstagram} />
                            <h6>52,085</h6>
                            <p>Follows</p>
                        </Card>
                    </Col>

                    <Col xl={3} sm={6} xs={12}>
                        <Card className="flex-fill linkedin sm-box">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                            <h6>69,050</h6>
                            <p>Follows</p>
                        </Card>
                    </Col>
                </Row>
                {/* /Socail Media Follows */}
            </div>
        )
    }
}
export { Dashboard };