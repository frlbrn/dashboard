import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      max: 0.3,
      min: 0,
      position: 'left',
      ticks: {
        color: "#9f9f9f",
        beginAtZero: false,
        maxTicksLimit: 5,
      },
      grid: {
        drawBorder: true,
        display: true,
      },
    },
    x: {
      grid: {
        drawBorder: true,
        display: true,
      },
      ticks: {
        padding: 20,
        color: "#9f9f9f",
      },
    },
  },
}

function ViewEnvironement() {
  const [electromagnetic_wave_evolution, setElectromagneticWaveEvolution] = useState([]);

  /*
  https://opendata.bordeaux-metropole.fr/explore/dataset/rt_ondeelectro_p_histo_jour/api/?disjunctive.ident&q=14781bc3-782e-4e12-a25c-52772c125f26&rows=10
  https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=rt_ondeelectro_p_histo_jour&q=14781bc3-782e-4e12-a25c-52772c125f26&rows=10&facet=time&facet=nom&facet=etat&facet=ident
  */
  useEffect(() => {

    fetch(`https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=rt_ondeelectro_p_histo_jour&q=14781bc3-782e-4e12-a25c-52772c125f26&sort=time&rows=150&facet=time&facet=nom&facet=etat&facet=ident`)
    .then( response => {
        if (!response.ok) { throw response }
        return response.json()  //we only get here if there is no error
      })
    .then(result => {

      let labels = []
      let values = []
        //data.push(['Jour', 'Ondes'])
        result.records.forEach(element => {
            //data.push([new Date(element.fields.time.split('-').join('/')), element.fields.mesure])
            labels.unshift(element.fields.time)
            values.unshift(element.fields.mesure)
        });

        let data = {labels: labels, datasets: [{
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          tension: 0.4,
          fill: false,
          data: values
        }]}
        console.log(data)
        setElectromagneticWaveEvolution(data)
    })
    .catch( err => {
        console.log(err)
        //err.text().then( errorMessage => {
          //  console.log(errorMessage)
          //this.props.dispatch(displayTheError(errorMessage))
      });
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Ondes Electromagnétiques</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={electromagnetic_wave_evolution}
                  options={options}
                  width={400}
                  height={150}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ViewEnvironement;
