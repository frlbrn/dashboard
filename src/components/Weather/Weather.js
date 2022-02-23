import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
  } from "reactstrap";

const Weather = () => {

    const [temperature, setTemperature] = useState([]);
    const [icon, setIcon] = useState([]);

  useEffect(() => {

    fetch(`https://www.prevision-meteo.ch/services/json/lat=44.840775685860585lng=-0.7761190254573928`)
    .then( response => {
        if (!response.ok) { throw response }
        return response.json()  //we only get here if there is no error
      })
    .then(result => {
        console.log(result)
        setTemperature(result.current_condition.tmp)
        setIcon(result.current_condition.icon)

    })
    .catch( err => {
        console.log(err)
        //err.text().then( errorMessage => {
          //  console.log(errorMessage)
          //this.props.dispatch(displayTheError(errorMessage))
      });
    

  }, [temperature]);

  return (
<>
    <Row>
    <Col md="12" xs="12">
      <div className="icon-big text-center icon-warning">
      <img alt="" src={icon} />
      </div>
    </Col>
    </Row>
    <Row>
    <Col md="12" xs="12">
      <div className="numbers">
      <p  align="center">{temperature}°C</p>
      </div>
    </Col>
  </Row>
  </>
  );
}

export default Weather;
