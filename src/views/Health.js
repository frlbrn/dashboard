import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import Papa from 'papaparse';


async function GetCsvData(csvfile) {
  const data = Papa.parse(await fetchCsv(csvfile), {delimiter: ";", header:true});
  console.log(data.data);
  return data;
}

async function fetchCsv(csvfile) {
  const response = await fetch(process.env.PUBLIC_URL+"/"+csvfile);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder('utf-8');
  const csv = await decoder.decode(result.value);
  //console.log('csv', csv);
  return csv;
}

const Health = () => {
    const [dae, setDae] = useState([]);
    const position = [44.84284, -0.77373];

      useEffect(() => {
        GetCsvData("dae.csv").then( data => {
        //console.log(data.data)
        setDae(data.data)
      });
      }, []);

    let iconDae = L.icon({
      iconSize: [25, 25],
      iconAnchor: [0, 0],
      popupAnchor: [10, 0],
      iconUrl: process.env.PUBLIC_URL+"/dae.png"
      //iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
      //shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    });

  
  return (
    
      <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Carte</CardTitle>
              </CardHeader>
              <CardBody>

              <MapContainer
          style={{ height: "580px", width: "100%" }}
          zoom={14}
          center={position}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  />

{dae && dae.map((item, index) => {
  const point = [item['lon'], item['lat']]
         
  return (
      <Marker key={index} position={point} icon={iconDae} >
          <Popup key={index}>
          <span key={index}><b>{item['name']}</b></span><br/>
          <span key={index}>Adresse : {item['adresse']}</span><br/>
          <span key={index}>Localisation : {item['localisation']}</span><br/>
          <span key={index}>Electrodes pédiatriques : {item['electrodes_pediatiques']}</span><br/>
          </Popup>
      </Marker>
    )
  })
}
        </MapContainer>

              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <img width="18" src={process.env.PUBLIC_URL+"/dae.png"} alt="dae" /> Défibrillateur&nbsp;&nbsp;
                </div>
                <hr />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Health;
