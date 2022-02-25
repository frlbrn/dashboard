import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Row,
  Col,
} from "reactstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      title: {
        text:"V / m",
        display:true,
      },
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
  
function get_date_to_display(key)
{
  const date_to_display = new Date(key);
  let currentLocaleDate = date_to_display.toLocaleString('fr-FR',{
    year: 'numeric',
    month: 'short',
    day: 'numeric'});
  return currentLocaleDate
}

function ViewEnvironement() {
  const [electromagnetic_wave_evolution, setElectromagneticWaveEvolution] = useState([]);


  let icon = L.icon({
    iconSize:   [25, 41],
    iconAnchor: [12, 41],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png"
  });
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
            labels.unshift(get_date_to_display(element.fields.time))
            values.unshift(element.fields.mesure)
        });

        let data = {labels: labels, datasets: [{
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          pointRadius: 0,
          pointHoverRadius: 10,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          data: values
        }]}
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
                <Row>
              <Col lg="9" md="9" sm="12">
                <Line
                  data={electromagnetic_wave_evolution}
                  options={options}
                  width={400}
                  height={250}
                />
              </Col>
              <Col lg="3" md="3" sm="12">
                <span>Localisation du capteur</span>
                <MapContainer
          style={{ height: "250px", width: "100%" }}
          zoom={14}
          center={[44.84238, -0.77900]}
        >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  />
      <Marker icon={icon} position={[44.84238, -0.77900]} >
          <Popup >
          <img alt="capteur" width="300" src="https://storage.googleapis.com/odo-prod-sites/site_14781bc3-782e-4e12-a25c-52772c125f26/photo_Martignas_sur_Jalle_1000x1000.webp"/><br/><br/>
          <span><a target="top" href="https://www.observatoiredesondes.com/fr/carte-des-ondes/capteurs/martignas-sur-jalle/14781bc3-782e-4e12-a25c-52772c125f26">Plus d'info...</a></span><br/>
          </Popup>
      </Marker>
          </MapContainer>
              </Col>
              </Row>
              </CardBody>
              <CardFooter>
                Sources:
                <ul>
                      <li>Capteur : <a target="top" href="https://www.observatoiredesondes.com/fr/carte-des-ondes/capteurs/martignas-sur-jalle/14781bc3-782e-4e12-a25c-52772c125f26">observatoiredesondes.com</a></li>
                      <li>Mesures : <a target="top" href="https://opendata.bordeaux-metropole.fr/explore/dataset/rt_ondeelectro_p_histo_jour/information/?disjunctive.ident">opendata.bordeaux-metropole.fr</a></li>
                  </ul>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ViewEnvironement;
