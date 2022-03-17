/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
} from "reactstrap";
import Clock from "components/Clock/Clock.js";
import CurrentDate from "components/Clock/CurrentDate.js";
import Weather from "components/Weather/Weather.js";
import WeatherOfTheDay from "components/Weather/WeatherOfTheDay.js";

function Dashboard() {
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="6" md="6" sm="12">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="2" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-calendar-60 text-success" />
                    </div>
                  </Col>
                  <Col md="10" xs="7">
                    <div className="numbers">
                      <p className="card-category">Date</p>
                      <CurrentDate/>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="12">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-watch-time text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Heure</p>
                      <Clock/>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12">
            <Card className="card-stats">
            <CardHeader>
                <p className="card-category">Météo</p>
              </CardHeader>
               <CardBody>
                 <Row>
                <Col lg="2" md="2" sm="12">
                <Weather/>
                </Col>
                <Col lg="10" md="10" sm="12">
                <WeatherOfTheDay/>
                </Col>
                </Row>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
