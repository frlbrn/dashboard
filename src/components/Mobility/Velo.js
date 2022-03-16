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
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import mapLines from './fv_trvel_l.geojson.json'
import bornes from './pc_captv_p.geojson.json'

/*
*
*/
const VeloCapteur = () => {

let iconBorne = L.icon({
  iconSize: [16, 16],
  iconAnchor: [0, 0],
  popupAnchor: [10, 0],
  iconUrl: process.env.PUBLIC_URL+"/compteur.jpg"
});

  return(<>


{bornes.features && bornes.features
  .map((item, index) => {
  const latlng = item['properties']['geo_point_2d']
  const point = [latlng[0], latlng[1]]
  return (
    <Marker key={index} position={point} icon={iconBorne} >
    <Popup key={index}>
    <span><b>Capteur de trafic vélo</b></span><br/>
    <span><b>Position</b> : {item['properties']['libelle']}</span><br/>
    <span><b>Type</b> : {item['properties']['type']}</span><br/>
    </Popup>
</Marker>

    )
  })
}

    </>
  )
}

const MobilityVelo = () => {
  const position = [44.84284, -0.77373];

  const onEach = (feature, layer) => {
        const long_descriptions = {"VOIE_VERTE": "Voie verte",
                        "RACCORD": "Raccord",
                        "TRAVERSEE": "Traversée",
                        "BANDES_CYCL_DBLE_SENS": "Bandes cyclables double sens",
                        "BANDES_CYCL": "Bandes cyclables",
                        "PISTES_CYCL": "Pistes cyclables",
                        "DBLE_SENS_PIST_CYCL": "Pistes cyclables double sens",
                        "ZONE_30_DBLE_SENS": "Zone 30 double sens",
                        "ALLEES_DE_PARCS": "Allées de parcs",
                        "ZONE_RENCONTRE": "Zone de rencontre",
                        "DBLE_SENS_CYCL": "Double sens cyclable"
                    }
        let description = feature["properties"]["typamena"]
        if (description in long_descriptions)
                description = long_descriptions[description]

        let content = '<b>'+description+'</b>'
        if (feature["properties"]["annee"] !== undefined)
            content = content + '</b><br/><br/>mise en service : '+feature["properties"]["annee"]
        layer.bindPopup(content)
      };

      const onStyle = (feature) => {
        let color_text_primary = "#51cbce"
        let color_text_info = "#51bcda"
        let color_text_success = "#6bd098"
        let color_text_warning = "#fbc658"
        let color_text_danger = "#ef8157"
        let color_text_gray = "#E3E3E3"
        
        let color = color_text_danger
        if (feature["properties"]["typamena"] === 'VOIE_VERTE')
            color = color_text_success
        //else if (feature["properties"]["typamena"] === 'RACCORD')
        //    color = color_text_info
        else if (feature["properties"]["typamena"] === 'ZONE_RENCONTRE')
            color = color_text_warning
        else if (feature["properties"]["typamena"] === 'BANDES_CYCL_DBLE_SENS' ||
                feature["properties"]["typamena"] === 'BANDES_CYCL' ||
                feature["properties"]["typamena"] === 'PISTES_CYCL' ||
                feature["properties"]["typamena"] === 'DBLE_SENS_PIST_CYCL' ||
                feature["properties"]["typamena"] === 'DBLE_SENS_CYCL')
            color = color_text_primary
        else if (feature["properties"]["typamena"] === 'ZONE_30_DBLE_SENS')
            color = color_text_danger
        return {
            weight: 0.3,
            //stroke-width: to have a constant width on the screen need to adapt with scale 
            opacity: 1,
            weight: 5,
            color: color,
            fillOpacity: 0.5
        };
    };
      
  return (
      <>
      <div className="content">

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Aménagements cyclables</CardTitle>
              </CardHeader>
              <CardBody>

              <MapContainer
          style={{ height: "580px", width: "100%" }}
          zoom={14}
          center={position}
        >
          <TileLayer url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />

        <GeoJSON key="0"
            data={mapLines.features} onEachFeature={onEach} style={onStyle}/>
        <VeloCapteur/>

        </MapContainer>

              </CardBody>
              <CardFooter>
                <div className="legend">
                <i className="fa fa-circle text-success" /> Voie verte{" "}
                <i className="fa fa-circle text-primary" /> Bande ou piste cyclable{" "}
                <i className="fa fa-circle text-warning" /> Zone de rencontre{" "}
                <i className="fa fa-circle text-danger" /> Autre{" "}
                </div>
                <hr />
                <span>
                Sources :
                <br/>- Aménagement cyclable : <a href="https://opendata.bordeaux-metropole.fr/explore/dataset/fv_trvel_l/information/">opendata.bordeaux-metropole.fr</a>
                <br/>- Capteur vélo trafic : <a href="https://opendata.bordeaux-metropole.fr/explore/dataset/pc_captv_p/information/">opendata.bordeaux-metropole.fr</a>
                </span>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default MobilityVelo;
